import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

// Converts the plain-text `description` columns to Lexical rich text (and back).
// Blank-line separated text becomes separate paragraphs.

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
  CREATE FUNCTION pg_temp.text_to_lexical(t text) RETURNS jsonb LANGUAGE sql IMMUTABLE AS $$
    SELECT CASE WHEN t IS NULL THEN NULL ELSE jsonb_build_object('root', jsonb_build_object(
      'type', 'root', 'format', '', 'indent', 0, 'version', 1, 'direction', 'ltr',
      'children', COALESCE((
        SELECT jsonb_agg(jsonb_build_object(
          'type', 'paragraph', 'format', '', 'indent', 0, 'version', 1, 'direction', 'ltr',
          'textFormat', 0, 'textStyle', '',
          'children', jsonb_build_array(jsonb_build_object(
            'type', 'text', 'version', 1, 'text', trim(p),
            'format', 0, 'mode', 'normal', 'style', '', 'detail', 0
          ))
        ) ORDER BY ord)
        FROM regexp_split_to_table(trim(t), '\\n\\s*\\n') WITH ORDINALITY AS x(p, ord)
        WHERE trim(p) <> ''
      ), '[]'::jsonb)
    )) END
  $$;
  ALTER TABLE "experience" ALTER COLUMN "description" SET DATA TYPE jsonb USING pg_temp.text_to_lexical("description");
  ALTER TABLE "_experience_v" ALTER COLUMN "version_description" SET DATA TYPE jsonb USING pg_temp.text_to_lexical("version_description");
  ALTER TABLE "projects" ALTER COLUMN "description" SET DATA TYPE jsonb USING pg_temp.text_to_lexical("description");
  ALTER TABLE "_projects_v" ALTER COLUMN "version_description" SET DATA TYPE jsonb USING pg_temp.text_to_lexical("version_description");
  DROP FUNCTION pg_temp.text_to_lexical(text);`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
  CREATE FUNCTION pg_temp.lexical_to_text(j jsonb) RETURNS text LANGUAGE sql IMMUTABLE AS $$
    SELECT string_agg(block_text, E'\\n\\n' ORDER BY ord)
    FROM (
      SELECT ord, (
        SELECT string_agg(t #>> '{}', '')
        FROM jsonb_path_query(block, 'strict $.**.text') AS t
      ) AS block_text
      FROM jsonb_array_elements(j -> 'root' -> 'children') WITH ORDINALITY AS b(block, ord)
    ) blocks
  $$;
  ALTER TABLE "experience" ALTER COLUMN "description" SET DATA TYPE varchar USING pg_temp.lexical_to_text("description");
  ALTER TABLE "_experience_v" ALTER COLUMN "version_description" SET DATA TYPE varchar USING pg_temp.lexical_to_text("version_description");
  ALTER TABLE "projects" ALTER COLUMN "description" SET DATA TYPE varchar USING pg_temp.lexical_to_text("description");
  ALTER TABLE "_projects_v" ALTER COLUMN "version_description" SET DATA TYPE varchar USING pg_temp.lexical_to_text("version_description");
  DROP FUNCTION pg_temp.lexical_to_text(jsonb);`)
}
