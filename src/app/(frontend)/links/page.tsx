import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowUpRight } from "lucide-react";
import FooterWrapper from "@/components/FooterWrapper";
import CustomLink from "@/components/CustomLink";
import { getPayload } from "payload";
import config from "@payload-config";
import type { Link } from "@/payload-types";

export default async function Links() {
  const payload = await getPayload({ config });

  const { docs: links } = await payload.find({
    collection: "links",
    where: { _status: { equals: "published" } },
    sort: "_order",
    limit: 100,
  });

  const groups: Link["group"][] = ["featured", "projects", "socials"];

  return (
    <main className="text-zinc-900 dark:text-zinc-100 max-w-xl mx-auto px-4 py-4 flex flex-col h-svh justify-between">
      <div>
        <section className="mb-12">
          <h1 className="text-lg font-medium tracking-tight mb-8 flex items-baseline justify-between">
            <span>some of my useful links</span>
            <ThemeToggle />
          </h1>
        </section>

        {groups.map((group) => {
          const groupLinks = links.filter((link) => link.group === group);
          if (groupLinks.length === 0) return null;

          return (
            <div key={group} className="flex flex-col gap-2 mb-8">
              {groupLinks.map((link) => (
                <div key={link.id} className="group">
                  <CustomLink
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between text-lg hover:translate-x-1 transition-all duration-300 ease-out"
                    track={link.track || `${link.name.toLowerCase()}_link_clicked`}
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight />
                  </CustomLink>
                </div>
              ))}
            </div>
          );
        })}
      </div>

      <FooterWrapper />
    </main>
  );
}
