import type { Project } from "@/payload-types";
import { ExternalLink } from "lucide-react";
import CustomLink from "@/components/CustomLink";
import Description from "@/components/Description";
import TechList from "@/components/home/TechList";

function ProjectLink({ href, track, children }: { href: string; track: string; children: React.ReactNode }) {
  return (
    <CustomLink
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
      track={track}
    >
      {children} <ExternalLink className="w-3 h-3" />
    </CustomLink>
  );
}

function ProjectItem({ project }: { project: Project }) {
  return (
    <li className="group hover:translate-x-1 transition-transform duration-300 ease-out">
      <div className="flex items-baseline justify-between mb-1">
        <h3 className="text-md font-medium">{project.title}</h3>
        <div className="flex flex-row gap-2">
          {project.github ? (
            <ProjectLink href={project.github} track={`${project.title}_github_clicked`}>
              GitHub
            </ProjectLink>
          ) : null}
          {project.link ? (
            <ProjectLink href={project.link} track={`${project.title}_clicked`}>
              View
            </ProjectLink>
          ) : null}
        </div>
      </div>
      <Description data={project.description} className="mb-2" />
      <TechList technologies={project.technologies} />
    </li>
  );
}

export default function ProjectList({ projects }: { projects: Project[] }) {
  return (
    <ul className="space-y-8">
      {projects.map((project) => (
        <ProjectItem key={project.id} project={project} />
      ))}
    </ul>
  );
}
