import type { GlobalConfig } from "payload";
import { revalidateSite } from "@/hooks/revalidate";

export const Profile: GlobalConfig = {
  slug: "profile",
  access: {
    read: () => true,
  },
  hooks: {
    afterChange: [revalidateSite],
  },
  fields: [
    {
      name: "greeting",
      type: "text",
      required: true,
      admin: { description: "The headline on the home page." },
    },
    {
      name: "bio",
      type: "richText",
      required: true,
      admin: { description: "Short intro paragraph. Links are supported." },
    },
    {
      name: "socials",
      type: "array",
      admin: { description: "Icon links shown under the intro on the home page." },
      fields: [
        {
          name: "platform",
          type: "select",
          required: true,
          options: ["github", "x", "linkedin", "email", "instagram", "codepen", "calcom"],
        },
        { name: "url", type: "text", required: true },
      ],
    },
  ],
};
