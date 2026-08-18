import type { CollectionConfig } from "payload";
import { publishedOrLoggedIn } from "@/access/publishedOrLoggedIn";
import { revalidateSite } from "@/hooks/revalidate";

export const Experience: CollectionConfig = {
  slug: "experience",
  orderable: true,
  versions: {
    drafts: true,
  },
  access: {
    read: publishedOrLoggedIn,
  },
  admin: {
    useAsTitle: "role",
    defaultColumns: ["role", "company", "period", "_status"],
  },
  hooks: {
    afterChange: [revalidateSite],
    afterDelete: [revalidateSite],
  },
  fields: [
    { name: "role", type: "text", required: true },
    {
      name: "company",
      type: "text",
      admin: {
        description: "Leave empty for freelance/self-employed entries.",
      },
    },
    {
      name: "period",
      type: "text",
      required: true,
      admin: { position: "sidebar", description: 'e.g. "Feb 2026 - Present"' },
    },
    { name: "description", type: "textarea", required: true },
    { name: "technologies", type: "text", hasMany: true },
  ],
};
