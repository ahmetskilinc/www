import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_experience_v" ADD COLUMN "autosave" boolean;
  ALTER TABLE "_projects_v" ADD COLUMN "autosave" boolean;
  CREATE INDEX "_experience_v_autosave_idx" ON "_experience_v" USING btree ("autosave");
  CREATE INDEX "_projects_v_autosave_idx" ON "_projects_v" USING btree ("autosave");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "_experience_v_autosave_idx";
  DROP INDEX "_projects_v_autosave_idx";
  ALTER TABLE "_experience_v" DROP COLUMN "autosave";
  ALTER TABLE "_projects_v" DROP COLUMN "autosave";`)
}
