import { revalidatePath } from "next/cache";

export const revalidateSite = () => {
  try {
    revalidatePath("/", "layout");
  } catch {
    // Outside a Next.js request context (e.g. the seed script) — nothing to revalidate.
  }
};
