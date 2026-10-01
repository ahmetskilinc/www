import type { CollectionConfig } from "payload";
import { publishedOrLoggedIn } from "@/access/publishedOrLoggedIn";
import { revalidateSite } from "@/hooks/revalidate";

export const Projects: CollectionConfig = {
  slug: "projects",
  orderable: true,
  versions: {
    // Autosave keeps the admin's live preview updating as you type.
    drafts: { autosave: { interval: 800 } },
  },
  access: {
    read: publishedOrLoggedIn,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "link", "_status"],
  },
  hooks: {
    afterChange: [revalidateSite],
    afterDelete: [revalidateSite],
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "richText", required: true },
    { name: "link", type: "text", admin: { position: "sidebar", description: "Live URL" } },
    { name: "github", type: "text", admin: { position: "sidebar", description: "GitHub / repo URL" } },
    { name: "technologies", type: "text", hasMany: true },
  ],
};
