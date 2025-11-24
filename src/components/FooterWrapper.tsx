import { headers } from "next/headers";
import Footer from "./Footer";

export default async function FooterWrapper() {
  const headersList = await headers();
  const host = headersList.get("host") || "";
  const domain = host.split(":")[0];

  return <Footer domain={domain} />;
}
