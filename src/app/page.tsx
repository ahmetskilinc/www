import SocialMedia from "@/components/SocialMedia";
import { ThemeToggle } from "@/components/ThemeToggle";
import FooterWrapper from "@/components/FooterWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import CustomLink from "@/components/CustomLink";

type Experience = {
  role: string;
  company?: string;
  period: string;
  description: string;
  technologies: string[];
  current?: boolean;
};

type Project = {
  title: string;
  description: string;
  link?: string;
  github?: string;
  technologies: string[];
};

const tabTriggerClasses = cn(
  "!bg-transparent !border-none !shadow-none !rounded-none !p-0 !h-auto",
  "!font-medium !text-[15px] !leading-5 !tracking-[-0.005em]",
  "!text-faint data-[state=active]:!text-paper",
  "hover:!text-smoke data-[state=active]:hover:!text-paper",
  "transition-colors duration-300 ease-out",
);

function splitPeriod(period: string) {
  const [start, end] = period.split(" - ");
  return { start: start ?? period, end: end ?? "" };
}

function TechCredits({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="flex flex-wrap items-center pt-1">
      {items.map((tech, i) => (
        <li key={tech} className="flex items-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-faint">{tech}</span>
          {i < items.length - 1 && <span className="font-mono text-[11px] text-very-faint px-2.5">·</span>}
        </li>
      ))}
    </ul>
  );
}

function PeriodColumn({ start, end, current = false }: { start: string; end: string; current?: boolean }) {
  return (
    <div className="md:w-24 shrink-0 md:pt-1">
      <div className="flex md:flex-col items-center md:items-start gap-x-2 md:gap-y-1.5 font-mono text-[11px] sm:text-xs uppercase tracking-[0.1em] leading-[18px]">
        {current && (
          <span aria-hidden className="inline-block md:hidden w-1.5 h-1.5 rounded-full bg-paper shrink-0" />
        )}
        <span className={cn(current ? "text-smoke" : "text-body")}>{start}</span>
        <span className="text-faint">{end ? `→ ${end}` : ""}</span>
      </div>
    </div>
  );
}

function ExperienceRow({ entry, isFirst }: { entry: Experience; isFirst: boolean }) {
  const { start, end } = splitPeriod(entry.period);
  const isFreelance = entry.role.toLowerCase().includes("freelance");
  return (
    <li className={cn("flex flex-col md:flex-row md:gap-6 py-7 sm:py-8", isFirst ? "border-t border-divider" : "border-t border-divider-weak")}>
      <PeriodColumn start={start} end={end} current={entry.current} />
      <div className="flex-1 flex flex-col gap-2.5 mt-2 md:mt-0">
        <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
          {entry.current && (
            <span aria-hidden className="hidden md:inline-block w-[7px] h-[7px] rounded-full bg-paper shrink-0" />
          )}
          <h3 className="text-[16px] md:text-[18px] font-medium tracking-[-0.01em] text-paper leading-6">{entry.role}</h3>
          {entry.company ? (
            <>
              <span aria-hidden className="text-faint leading-6 select-none">—</span>
              <span className="font-display italic text-[18px] md:text-[20px] tracking-[-0.015em] text-paper leading-6">
                {entry.company}
              </span>
            </>
          ) : (
            <span className="font-display italic text-[18px] md:text-[20px] tracking-[-0.015em] text-paper/70 leading-6">
              {isFreelance ? "Independent" : ""}
            </span>
          )}
        </div>
        <p className="text-[14px] md:text-[15px] leading-6 text-body max-w-md">{entry.description}</p>
        <TechCredits items={entry.technologies} />
      </div>
    </li>
  );
}

function ProjectRow({ project, index, isFirst }: { project: Project; index: number; isFirst: boolean }) {
  const indexLabel = `P‑${index.toString().padStart(2, "0")}`;
  return (
    <li
      className={cn(
        "flex flex-col md:flex-row md:gap-6 py-7 sm:py-8",
        isFirst ? "border-t border-divider" : "border-t border-divider-weak",
      )}
    >
      <div className="md:w-24 shrink-0 md:pt-1 mb-2 md:mb-0">
        <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.1em] text-body leading-[18px]">{indexLabel}</span>
      </div>
      <div className="flex-1 flex flex-col gap-2.5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <h3 className="text-[16px] md:text-[18px] font-medium tracking-[-0.01em] text-paper leading-6">{project.title}</h3>
          <div className="flex items-center gap-3.5">
            {project.link ? (
              <CustomLink
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.1em] text-smoke hover:text-paper transition-colors"
                track={`${project.title}_clicked`}
              >
                View ↗
              </CustomLink>
            ) : null}
            {project.github ? (
              <CustomLink
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.1em] text-smoke hover:text-paper transition-colors"
                track={`${project.title}_github_clicked`}
              >
                GitHub ↗
              </CustomLink>
            ) : null}
          </div>
        </div>
        <p className="text-[14px] md:text-[15px] leading-6 text-body max-w-md">{project.description}</p>
        <TechCredits items={project.technologies} />
      </div>
    </li>
  );
}

export default function Home() {
  return (
    <main className="max-w-xl mx-auto px-6 sm:px-8 pt-10 sm:pt-14 pb-10 sm:pb-16 min-h-svh flex flex-col">
      <div className="flex-1">
        <header>
          <div className="flex items-center justify-end pb-16 sm:pb-24">
            <ThemeToggle />
          </div>

          <h1 className="font-display text-[44px] sm:text-[60px] md:text-[72px] font-medium tracking-[-0.035em] leading-[0.92] text-paper">
            Ahmet Kilinç
          </h1>

          <div className="mt-7 sm:mt-10 flex flex-col gap-2 max-w-md">
            <p className="text-[16px] sm:text-[19px] leading-[1.55] tracking-[-0.005em] text-paper">
              Senior frontend engineer based in London. Most recently working on developer tools, mail, and AI products.
            </p>
            <p className="text-[16px] sm:text-[19px] leading-[1.55] tracking-[-0.005em] text-body">
              Currently shipping at{" "}
              <CustomLink
                href="https://coderabbit.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper font-medium hover:underline underline-offset-4 decoration-paper/40"
                track="coderabbit_clicked"
              >
                CodeRabbit
              </CustomLink>
              .
            </p>
          </div>

          <div className="mt-8 sm:mt-10 pb-16 sm:pb-28">
            <SocialMedia />
          </div>
        </header>

        <Tabs defaultValue="experience" className="gap-0">
          <div className="border-t border-divider pt-7 sm:pt-9 pb-6 sm:pb-7">
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.14em] text-smoke">
              § 01 — Selected
            </span>
          </div>

          <TabsList className="!h-auto !p-0 !bg-transparent !rounded-none !w-fit flex items-center gap-7 mb-10 sm:mb-12">
            <TabsTrigger value="experience" className={tabTriggerClasses}>
              Experience
            </TabsTrigger>
            <TabsTrigger value="projects" className={tabTriggerClasses}>
              Projects
            </TabsTrigger>
          </TabsList>

          <TabsContent value="experience" className="!mt-0">
            <ul>
              {experience.map((entry, i) => (
                <ExperienceRow key={`${entry.role}-${entry.period}`} entry={entry} isFirst={i === 0} />
              ))}
            </ul>
          </TabsContent>

          <TabsContent value="projects" className="!mt-0">
            <ul>
              {projects.map((project, i) => (
                <ProjectRow key={project.title} project={project} index={i + 1} isFirst={i === 0} />
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </div>

      <FooterWrapper />
    </main>
  );
}

const experience: Experience[] = [
  {
    role: "Senior Frontend Engineer",
    company: "CodeRabbit",
    period: "Feb 2026 - Present",
    description: "Senior frontend engineer building the frontend across the product — UI, performance, and integrations.",
    technologies: [],
    current: true,
  },
  {
    role: "Senior Frontend Engineer",
    company: "Incard",
    period: "Nov 2025 - Jan 2026",
    description: "Senior frontend engineer responsible for building the new version of the Incard website.",
    technologies: ["Next.js", "TypeScript", "Tailwind", "SWR", "Vercel"],
  },
  {
    role: "Software Engineer",
    company: "Zero Email Inc.",
    period: "Feb 2025 - Oct 2025",
    description:
      "Software engineer responsible for core features and performance optimisations for an AI-powered email client, focusing on intelligent email processing and real-time collaboration.",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Postgres", "Google APIs"],
  },
  {
    role: "Freelance Developer",
    period: "Mar 2024 - May 2025",
    description:
      "Delivering custom web solutions for diverse clients, specialising in e-commerce platforms, content management systems, and business automation tools.",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Postgres", "MongoDB", "PayloadCMS", "Google APIs"],
  },
  {
    role: "Front End Developer",
    company: "Executives Place",
    period: "Oct 2023 - Feb 2024",
    description: "Developed and maintained multiple features for the SaaS product, from performance improvements to new features.",
    technologies: ["Vue.js", "Node.js", "Laravel", "SQL"],
  },
  {
    role: "Full Stack Developer",
    company: "XLN · Daisy Comms",
    period: "Nov 2020 - Aug 2023",
    description: "Developed and maintained the company brochure site to guide and increase sales.",
    technologies: ["Vue.js", "Nuxt.js", "JavaScript", "SQL", "MongoDB", "C#", "ASP.NET", "WordPress"],
  },
];

const projects: Project[] = [
  {
    title: "Email Renderer",
    description: "A tool to test HTML and React Email emails in your browser.",
    link: "https://email-renderer-web.vercel.app",
    github: "https://github.com/ahmetskilinc/email-renderer",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Shadcn", "React Email", "Vercel", "Resend"],
  },
  {
    title: "Gitbruv",
    description: "A GitHub alternative — web and mobile, with a Rust core.",
    link: "https://gitbruv.dev",
    github: "https://gitbruv.dev/bruv/gitbruv",
    technologies: ["Tanstack Start", "Tanstack Query", "Expo", "React Native", "TypeScript", "Rust", "Tailwind", "Postgres", "Drizzle", "Bun"],
  },
  {
    title: "oss.now (acquired)",
    description: "A place to share your open source projects and discover new ones.",
    link: "https://oss.now",
    github: "https://github.com/collabute/ossdotnow",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Shadcn", "Postgres", "Drizzle", "Bun", "tRPC", "Vercel"],
  },
  {
    title: "UI Registry",
    description: "A simple UI registry for components and blocks using the shadcn API.",
    link: "https://ahmet.studio/ui",
    github: "https://github.com/ahmetskilinc/ui",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Shadcn"],
  },
  {
    title: "E‑commerce Platform",
    description: "A full-featured e-commerce platform with product management, cart, and Stripe checkout.",
    link: "https://payload-ecommerce-app.vercel.app/",
    github: "https://github.com/ahmetskilinc/payload-ecommerce",
    technologies: ["Next.js", "TypeScript", "Tailwind", "Payload CMS", "Stripe"],
  },
  {
    title: "Payload Appointment Plugin",
    description: "A Payload CMS plugin for scheduling appointments.",
    github: "https://github.com/ahmetskilinc/payload-appointments-plugin",
    technologies: ["Next.js", "TypeScript", "Payload"],
  },
  {
    title: "Payload Media Grid Plugin",
    description: "A Payload CMS plugin for viewing media in a grid layout.",
    github: "https://github.com/ahmetskilinc/payload-media-grid-plugin",
    technologies: ["Next.js", "TypeScript", "Payload"],
  },
];
