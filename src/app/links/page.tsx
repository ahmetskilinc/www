import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowUpRight } from "lucide-react";
import FooterWrapper from "@/components/FooterWrapper";
import CustomLink from "@/components/CustomLink";

export default function Links() {
  return (
    <main className="text-zinc-900 dark:text-zinc-100 max-w-xl mx-auto px-4 py-4 flex flex-col h-svh justify-between">
      <div>
        <section className="mb-12">
          <h1 className="text-lg font-medium tracking-tight mb-8 flex items-baseline justify-between">
            <span>some of my useful links</span>
            <ThemeToggle />
          </h1>
        </section>

        <div className="flex flex-col gap-2 mb-8">
          <div className="group">
            <CustomLink
              href="https://cal.link/ahmet"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-lg hover:translate-x-1 transition-all duration-300 ease-out"
              track="cal_link_clicked"
            >
              <span>Book a call</span>
              <ArrowUpRight />
            </CustomLink>
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-8">
          {projectLinks.map((link) => (
            <div key={link.name} className="group">
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

        <div className="flex flex-col gap-2 mb-8">
          {socialLinks.map((link) => (
            <div key={link.name} className="group">
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
      </div>

      <FooterWrapper />
    </main>
  );
}

type Link = {
  name: string;
  url: string;
  track?: string;
};

const projectLinks: Link[] = [
  {
    name: "oss.now (acquired)",
    url: "https://oss.now",
  },
  {
    name: "ui.ahmet.studio",
    url: "https://ui.ahmet.studio",
  },
];

const socialLinks: Link[] = [
  {
    name: "Portfolio",
    url: "https://dub.sh/ahmet",
  },
  {
    name: "GitHub",
    url: "https://dub.sh/ahmetgh",
  },
  {
    name: "X",
    url: "https://dub.sh/ahmetx",
  },
  {
    name: "LinkedIn",
    url: "https://dub.sh/ahmetli",
  },
  {
    name: "Instagram",
    url: "https://dub.sh/ahmetig",
  },
];
