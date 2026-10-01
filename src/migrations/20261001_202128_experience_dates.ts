import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Replaces the free-text `period` ("Feb 2026 - Present") with structured
// start/end dates and a `current` flag, and drops manual ordering in favour of
// sorting by start date. Dates are stored as noon UTC on the 1st of the month.
//
// Unparseable periods on live documents abort the migration (so a deploy fails
// rather than losing data); on old versions they're left empty.

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE FUNCTION pg_temp.parse_month(part text, strict boolean) RETURNS timestamptz LANGUAGE plpgsql AS $$
  DECLARE
    m text[];
  BEGIN
    part := trim(part);
    m := regexp_match(part, '^([A-Za-z]{3})[A-Za-z]*\\.?\\s+(\\d{4})$');
    IF m IS NOT NULL THEN
      RETURN (to_date(m[1] || ' ' || m[2], 'Mon YYYY') + time '12:00') AT TIME ZONE 'UTC';
    END IF;
    m := regexp_match(part, '^(\\d{4})$');
    IF m IS NOT NULL THEN
      RETURN make_timestamptz(m[1]::int, 1, 1, 12, 0, 0, 'UTC');
    END IF;
    IF strict THEN
      RAISE EXCEPTION 'Could not parse experience period part "%"', part;
    END IF;
    RETURN NULL;
  END
  $$;

  CREATE FUNCTION pg_temp.is_present(part text) RETURNS boolean LANGUAGE sql IMMUTABLE AS $$
    SELECT lower(trim(part)) IN ('present', 'now', 'current', 'today')
  $$;

  ALTER TABLE "experience" ADD COLUMN "start_date" timestamp(3) with time zone;
  ALTER TABLE "experience" ADD COLUMN "current" boolean DEFAULT false;
  ALTER TABLE "experience" ADD COLUMN "end_date" timestamp(3) with time zone;
  ALTER TABLE "_experience_v" ADD COLUMN "version_start_date" timestamp(3) with time zone;
  ALTER TABLE "_experience_v" ADD COLUMN "version_current" boolean DEFAULT false;
  ALTER TABLE "_experience_v" ADD COLUMN "version_end_date" timestamp(3) with time zone;

  UPDATE "experience" e SET
    "start_date" = pg_temp.parse_month(p[1], true),
    "current" = coalesce(pg_temp.is_present(p[2]), false),
    "end_date" = CASE
      WHEN p[2] IS NULL THEN pg_temp.parse_month(p[1], true)
      WHEN pg_temp.is_present(p[2]) THEN NULL
      ELSE pg_temp.parse_month(p[2], true)
    END
  FROM (SELECT id, regexp_split_to_array(trim("period"), '\\s*[-–—]\\s*') AS p FROM "experience") s
  WHERE s.id = e.id AND e."period" IS NOT NULL AND trim(e."period") <> '';

  UPDATE "_experience_v" v SET
    "version_start_date" = pg_temp.parse_month(p[1], false),
    "version_current" = coalesce(pg_temp.is_present(p[2]), false),
    "version_end_date" = CASE
      WHEN p[2] IS NULL THEN pg_temp.parse_month(p[1], false)
      WHEN pg_temp.is_present(p[2]) THEN NULL
      ELSE pg_temp.parse_month(p[2], false)
    END
  FROM (SELECT id, regexp_split_to_array(trim("version_period"), '\\s*[-–—]\\s*') AS p FROM "_experience_v") s
  WHERE s.id = v.id AND v."version_period" IS NOT NULL AND trim(v."version_period") <> '';

  DROP FUNCTION pg_temp.parse_month(text, boolean);
  DROP FUNCTION pg_temp.is_present(text);

  DROP INDEX "experience__order_idx";
  DROP INDEX "_experience_v_version_version__order_idx";
  ALTER TABLE "experience" DROP COLUMN "_order";
  ALTER TABLE "experience" DROP COLUMN "period";
  ALTER TABLE "_experience_v" DROP COLUMN "version__order";
  ALTER TABLE "_experience_v" DROP COLUMN "version_period";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  ALTER TABLE "experience" ADD COLUMN "_order" varchar;
  ALTER TABLE "experience" ADD COLUMN "period" varchar;
  ALTER TABLE "_experience_v" ADD COLUMN "version__order" varchar;
  ALTER TABLE "_experience_v" ADD COLUMN "version_period" varchar;
  CREATE INDEX "experience__order_idx" ON "experience" USING btree ("_order");
  CREATE INDEX "_experience_v_version_version__order_idx" ON "_experience_v" USING btree ("version__order");

  UPDATE "experience" SET "period" =
    to_char("start_date" AT TIME ZONE 'Europe/London', 'Mon YYYY') || ' - ' ||
    CASE WHEN "current" OR "end_date" IS NULL THEN 'Present'
      ELSE to_char("end_date" AT TIME ZONE 'Europe/London', 'Mon YYYY') END
  WHERE "start_date" IS NOT NULL;

  UPDATE "_experience_v" SET "version_period" =
    to_char("version_start_date" AT TIME ZONE 'Europe/London', 'Mon YYYY') || ' - ' ||
    CASE WHEN "version_current" OR "version_end_date" IS NULL THEN 'Present'
      ELSE to_char("version_end_date" AT TIME ZONE 'Europe/London', 'Mon YYYY') END
  WHERE "version_start_date" IS NOT NULL;

  -- Restore manual ordering as newest-first fractional index keys (a0, a1, ...).
  UPDATE "experience" e SET "_order" = 'a' || substr('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', o.rn::int, 1)
  FROM (SELECT id, row_number() OVER (ORDER BY "start_date" DESC NULLS LAST, id) AS rn FROM "experience") o
  WHERE o.id = e.id AND o.rn <= 62;

  ALTER TABLE "experience" DROP COLUMN "start_date";
  ALTER TABLE "experience" DROP COLUMN "current";
  ALTER TABLE "experience" DROP COLUMN "end_date";
  ALTER TABLE "_experience_v" DROP COLUMN "version_start_date";
  ALTER TABLE "_experience_v" DROP COLUMN "version_current";
  ALTER TABLE "_experience_v" DROP COLUMN "version_end_date";`)
}
