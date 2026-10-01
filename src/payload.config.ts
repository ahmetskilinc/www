import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";

import { Users } from "@/collections/Users";
import { Experience } from "@/collections/Experience";
import { Projects } from "@/collections/Projects";
import { Links } from "@/collections/Links";
import { Profile } from "@/globals/Profile";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      // Same origin as the admin, so the preview route can read the Payload auth cookie.
      url: ({ req }) => {
        const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
        const proto = req.headers.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
        return `${proto}://${host}/next/preview?path=/`;
      },
      collections: ["experience", "projects"],
      globals: ["profile"],
      breakpoints: [
        { name: "mobile", label: "Mobile", width: 375, height: 667 },
        { name: "desktop", label: "Desktop", width: 1280, height: 800 },
      ],
    },
  },
  collections: [Experience, Projects, Links, Users],
  globals: [Profile],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    // Schema changes go through migrations (`bun run migrate:create`), never dev-mode push.
    push: false,
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
  }),
  sharp,
});
