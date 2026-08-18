import type { CollectionConfig } from "payload";
import { publishedOrLoggedIn } from "@/access/publishedOrLoggedIn";
import { revalidateSite } from "@/hooks/revalidate";

export const Links: CollectionConfig = {
  slug: "links",
  orderable: true,
  versions: {
    drafts: true,
  },
  access: {
    read: publishedOrLoggedIn,
  },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "url", "group", "_status"],
    description: "Links shown on the /links page, grouped into sections.",
  },
  hooks: {
    afterChange: [revalidateSite],
    afterDelete: [revalidateSite],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "url", type: "text", required: true },
    {
      name: "group",
      type: "select",
      required: true,
      options: [
        { label: "Featured (top section)", value: "featured" },
        { label: "Projects", value: "projects" },
        { label: "Socials", value: "socials" },
      ],
      admin: { position: "sidebar" },
    },
    {
      name: "track",
      type: "text",
      admin: {
        position: "sidebar",
        description: "Vercel Analytics event name. Defaults to \"<name>_link_clicked\".",
      },
    },
  ],
};
