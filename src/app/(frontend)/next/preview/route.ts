import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";

// Entry point for the admin's live preview iframe. Only logged-in Payload users
// can turn on draft mode, which makes the site render unpublished content.
export async function GET(request: Request) {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: request.headers });

  if (!user) {
    return new Response("You must be logged in to preview drafts.", { status: 403 });
  }

  const path = new URL(request.url).searchParams.get("path") ?? "/";
  const safePath = path.startsWith("/") && !path.startsWith("//") ? path : "/";

  (await draftMode()).enable();
  redirect(safePath);
}
