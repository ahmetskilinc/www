import { getPayload } from "payload";
import config from "@payload-config";

const bio = (children: object[]) => ({
  root: {
    type: "root",
    format: "" as const,
    indent: 0,
    version: 1,
    direction: "ltr" as const,
    children: [
      {
        type: "paragraph",
        format: "" as const,
        indent: 0,
        version: 1,
        direction: "ltr" as const,
        children,
      },
    ],
  },
});

const text = (t: string) => ({ type: "text", version: 1, text: t });
const link = (t: string, url: string) => ({
  type: "link",
  version: 3,
  fields: { url, newTab: true, linkType: "custom" },
  children: [text(t)],
});

type SeedExperience = {
  role: string;
  company: string | null;
  period: string;
  description: string;
  technologies: string[];
  draft?: boolean;
};

type SeedProject = {
  title: string;
  description: string;
  link?: string;
  github?: string;
  technologies: string[];
  draft?: boolean;
};

const experience: SeedExperience[] = [
  {
    role: "Senior Frontend Engineer",
    company: "CodeRabbit AI",
    period: "Feb 2026 - Present",
    description: "Senior frontend engineer uuhh building.. stuff..",
    technologies: [],
  },
  {
    role: "Senior Frontend Engineer",
    company: "Incard Ltd.",
    period: "Nov 2025 - Jan 2026",
    description: "Senior frontend engineer responsible for building the new version of the Incard website.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "SWR", "Vercel"],
  },
  {
    role: "Software Engineer",
    company: "Zero Email Inc. (US, remote)",
    period: "Feb 2025 - Oct 2025",
    description:
      "Software engineer responsible for core features and performance optimisations for an innovative AI-powered email client, focusing on intelligent email processing and real-time collaboration.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Postgres", "Google APIs"],
  },
  {
    role: "Freelance Developer",
    company: null,
    period: "Mar 2024 - May 2025",
    description:
      "Delivering custom web solutions for diverse clients, specialising in e-commerce platforms, content management systems, and business automation tools.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Postgres", "MongoDB", "PayloadCMS", "Google APIs"],
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
    company: "XLN Telecom (Daisy Comms)",
    period: "Nov 2020 - Aug 2023",
    description: "Developed and maintained the company brochure site to guide and increase sales.",
    technologies: ["Vue.js", "Nuxt.js", "JavaScript", "SQL", "MongoDB", "C#", "ASP.NET", "WordPress"],
  },
  {
    role: "Junior Web Developer",
    company: "Absowebly",
    period: "Jul 2018 - Sep 2018",
    description: "Developing and maintaining client websites with a proprietary CMS.",
    technologies: ["PHP", "HTML", "CSS", "JavaScript", "Sass"],
    draft: true,
  },
];

const projects: SeedProject[] = [
  {
    title: "email renderer",
    description: "A tool to test html and React Email emails in your browser.",
    link: "https://email-renderer-web.vercel.app",
    github: "https://github.com/ahmetskilinc/email-renderer",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "React Email", "Vercel", "Resend"],
  },
  {
    title: "gitbruv",
    description: "A Github alternative.",
    link: "https://gitbruv.dev",
    github: "https://gitbruv.dev/bruv/gitbruv",
    technologies: [
      "Tanstack Start",
      "Tanstack Query",
      "Expo",
      "React Native",
      "TypeScript",
      "Rust",
      "Tailwind CSS",
      "Shadcn UI",
      "Postgres",
      "DrizzleORM",
      "Bun",
    ],
  },
  {
    title: "oss.now (acquired)",
    description: "A place to share your open source projects and find new ones.",
    link: "https://oss.now",
    github: "https://github.com/collabute/ossdotnow",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI", "Postgres", "DrizzleORM", "Bun", "tRPC", "Vercel"],
  },
  {
    title: "UI Registry",
    description: "A simple UI registry for components and blocks using the shadcn api.",
    link: "https://ahmet.studio/ui",
    github: "https://github.com/ahmetskilinc/ui",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Shadcn UI"],
  },
  {
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with product management, cart functionality, and payment processing.",
    link: "https://payload-ecommerce-app.vercel.app/",
    github: "https://github.com/ahmetskilinc/payload-ecommerce",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Payload CMS", "Stripe"],
  },
  {
    title: "Portfolio Website",
    description: "A minimalist portfolio website showcasing projects and skills with a clean, responsive design.",
    link: "https://dub.sh/ahmet/",
    github: "https://github.com/ahmetskilinc/portfolio-new-new-new-new",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    draft: true,
  },
  {
    title: "Work Hours Tracker - web",
    description: "A collaborative task management web application with real-time updates and team functionality.",
    link: "https://work-hours-tracker-chi.vercel.app/",
    github: "https://github.com/ahmetskilinc/work-hours-web",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Web Sockets", "Supabase"],
    draft: true,
  },
  {
    title: "Work Hours Tracker - mobile",
    description: "A collaborative task management mobile application with real-time updates and team functionality.",
    github: "https://github.com/ahmetskilinc/work-hours-app",
    technologies: ["Expo", "React Native", "TypeScript", "Web Sockets", "Supabase"],
    draft: true,
  },
  {
    title: "Payload CMS Appointment Scheduling Plugin",
    description: "A plugin for Payload CMS that allows users to schedule appointments.",
    github: "https://github.com/ahmetskilinc/payload-appointments-plugin",
    technologies: ["Next.js", "TypeScript", "Payload CMS"],
  },
  {
    title: "Payload CMS Media Grid View Plugin",
    description: "A plugin for Payload CMS that allows users to view media in a grid view.",
    github: "https://github.com/ahmetskilinc/payload-media-grid-plugin",
    technologies: ["Next.js", "TypeScript", "Payload CMS"],
  },
];

const links = [
  { name: "Book a call", url: "https://cal.link/ahmet", group: "featured", track: "cal_link_clicked" },
  { name: "oss.now (acquired)", url: "https://oss.now", group: "projects" },
  { name: "ui.ahmet.studio", url: "https://ui.ahmet.studio", group: "projects" },
  { name: "Portfolio", url: "https://dub.sh/ahmet", group: "socials" },
  { name: "GitHub", url: "https://dub.sh/ahmetgh", group: "socials" },
  { name: "X", url: "https://dub.sh/ahmetx", group: "socials" },
  { name: "LinkedIn", url: "https://dub.sh/ahmetli", group: "socials" },
  { name: "Instagram", url: "https://dub.sh/ahmetig", group: "socials" },
] as const;

const socials = [
  { platform: "github", url: "https://dub.sh/ahmetgh" },
  { platform: "x", url: "https://dub.sh/ahmetx" },
  { platform: "linkedin", url: "https://dub.sh/ahmetli" },
  { platform: "email", url: "mailto:ahmetskilinc@icloud.com" },
  { platform: "instagram", url: "https://dub.sh/ahmetig" },
] as const;

const seed = async () => {
  const payload = await getPayload({ config });

  const existing = await payload.count({ collection: "experience" });
  if (existing.totalDocs > 0) {
    payload.logger.info("Database already has content — skipping seed.");
    process.exit(0);
  }

  for (const { draft, ...job } of experience) {
    await payload.create({
      collection: "experience",
      data: { ...job, _status: draft ? "draft" : "published" },
    });
  }
  payload.logger.info(`Seeded ${experience.length} experience entries.`);

  for (const { draft, ...project } of projects) {
    await payload.create({
      collection: "projects",
      data: { ...project, _status: draft ? "draft" : "published" },
    });
  }
  payload.logger.info(`Seeded ${projects.length} projects.`);

  for (const item of links) {
    await payload.create({
      collection: "links",
      data: { ...item, _status: "published" },
    });
  }
  payload.logger.info(`Seeded ${links.length} links.`);

  await payload.updateGlobal({
    slug: "profile",
    data: {
      greeting: "Hey, I'm Ahmet",
      bio: bio([
        text("Software Engineer from London. Currently working as a Senior Frontend Engineer at "),
        link("CodeRabbit AI", "https://coderabbit.ai/"),
        text("."),
      ]),
      socials: [...socials],
    },
  });
  payload.logger.info("Seeded profile global.");

  process.exit(0);
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
