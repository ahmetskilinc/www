"use client";

import { ThemeToggle } from "@/components/ThemeToggle";
import { ArrowUpRight } from "lucide-react";
import { track } from "@vercel/analytics";
import Link from "next/link";

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
            <Link
              href="https://cal.link/ahmet"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-lg hover:translate-x-1 transition-all duration-300 ease-out"
              onClick={() => track(`cal_link_clicked`)}
            >
              <span>Book a call</span>
              <ArrowUpRight />
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {projectLinks.map((link) => (
            <div key={link.name} className="group">
              <Link
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-lg hover:translate-x-1 transition-all duration-300 ease-out"
                onClick={() => track(link.track || `${link.name.toLowerCase()}_link_clicked`)}
              >
                <span>{link.name}</span>
                <ArrowUpRight />
              </Link>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {socialLinks.map((link) => (
            <div key={link.name} className="group">
              <Link
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-lg hover:translate-x-1 transition-all duration-300 ease-out"
                onClick={() => track(link.track || `${link.name.toLowerCase()}_link_clicked`)}
              >
                <span>{link.name}</span>
                <ArrowUpRight />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <footer className="pt-4 text-xs text-zinc-400 dark:text-zinc-500 flex justify-between items-center">
        <div>ahmet.studio</div>
        <div>Built with Next.js</div>
      </footer>
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
    name: "oss.now",
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
