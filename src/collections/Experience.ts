import type { CollectionConfig, DateFieldValidation } from "payload";
import { publishedOrLoggedIn } from "@/access/publishedOrLoggedIn";
import { revalidateSite } from "@/hooks/revalidate";

const monthPicker = { date: { pickerAppearance: "monthOnly", displayFormat: "MMM yyyy" } } as const;

const validateEndDate: DateFieldValidation = (value, { siblingData }) => {
  const { current, startDate } = siblingData as { current?: boolean; startDate?: string };
  if (current) return true;
  if (!value) return "Add an end date, or tick \"I currently work here\".";
  if (startDate && new Date(value) < new Date(startDate)) return "End date can't be before the start date.";
  return true;
};

export const Experience: CollectionConfig = {
  slug: "experience",
  versions: {
    // Autosave keeps the admin's live preview updating as you type.
    drafts: { autosave: { interval: 800 } },
  },
  access: {
    read: publishedOrLoggedIn,
  },
  admin: {
    useAsTitle: "role",
    defaultColumns: ["role", "company", "startDate", "endDate", "_status"],
    description: "Sorted on the site by start date, newest first.",
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
      name: "startDate",
      type: "date",
      required: true,
      admin: { position: "sidebar", ...monthPicker },
    },
    {
      name: "current",
      label: "I currently work here",
      type: "checkbox",
      defaultValue: false,
      admin: { position: "sidebar" },
    },
    {
      name: "endDate",
      type: "date",
      validate: validateEndDate,
      admin: { position: "sidebar", condition: (_, siblingData) => !siblingData?.current, ...monthPicker },
    },
    { name: "description", type: "richText", required: true },
    { name: "technologies", type: "text", hasMany: true },
  ],
};
