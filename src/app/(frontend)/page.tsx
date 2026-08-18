import SocialMedia from "@/components/SocialMedia";
import { ThemeToggle } from "@/components/ThemeToggle";
import FooterWrapper from "@/components/FooterWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import CustomLink from "@/components/CustomLink";
import { getPayload } from "payload";
import config from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";

export default async function Home() {
  const payload = await getPayload({ config });

  const [profile, { docs: experience }, { docs: projects }] = await Promise.all([
    payload.findGlobal({ slug: "profile" }),
    payload.find({
      collection: "experience",
      where: { _status: { equals: "published" } },
      sort: "_order",
      limit: 100,
    }),
    payload.find({
      collection: "projects",
      where: { _status: { equals: "published" } },
      sort: "_order",
      limit: 100,
    }),
  ]);

  return (
    <main className="text-zinc-900 dark:text-zinc-100 max-w-xl mx-auto px-4 py-4 min-h-svh flex flex-col justify-between">
      <div>
        <section className="mb-6">
          <h1 className="text-xl font-medium tracking-tight mb-4 flex items-baseline justify-between">
            <span>{profile.greeting}</span>
            <ThemeToggle />
          </h1>
          <div
            className={cn(
              "text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mb-8",
              "[&_a]:text-zinc-900 dark:[&_a]:text-zinc-100 [&_a]:transition-colors",
            )}
          >
            <RichText data={profile.bio} />
          </div>

          <div className="flex items-center gap-5">
            <SocialMedia socials={profile.socials ?? []} />
          </div>
        </section>

        <Tabs defaultValue="experience">
          <TabsList className="mb-4 border-none bg-transparent p-0 -ml-[8px]">
            <TabsTrigger
              value="experience"
              className={cn(
                "!bg-transparent !border-none !shadow-none",
                "!font-light data-[state=active]:!font-bold transition-all duration-300 ease-out",
                "!text-neutral-400 dark:!text-neutral-400",
                "data-[state=active]:!text-neutral-800 dark:data-[state=active]:!text-neutral-100",
              )}
            >
              Experience
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className={cn(
                "!bg-transparent !border-none !shadow-none",
                "!font-light data-[state=active]:!font-bold transition-all duration-300 ease-out",
                "!text-neutral-400 dark:!text-neutral-400",
                "data-[state=active]:!text-neutral-800 dark:data-[state=active]:!text-neutral-100",
              )}
            >
              Projects
            </TabsTrigger>
          </TabsList>

          <TabsContent value="experience">
            <section className="mb-12">
              <div className="space-y-8">
                <ul className="space-y-8">
                  {experience.map((job) => (
                    <li key={job.id} className="group hover:translate-x-1 transition-all duration-300 ease-out">
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
                        <h3 className="text-md font-medium">
                          {job.role}
                          {job.company ? ` at ${job.company}` : ""}
                        </h3>
                        <span className="text-xs text-zinc-400 dark:text-zinc-500">{job.period}</span>
                      </div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">{job.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {(job.technologies ?? []).map((tech, techIndex) => (
                          <span key={techIndex} className="text-xs text-zinc-400 dark:text-zinc-500">
                            {tech}
                            {techIndex < (job.technologies?.length ?? 0) - 1 ? " /" : ""}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </TabsContent>
          <TabsContent value="projects">
            <section className="mb-12">
              <div className="space-y-8">
                <ul className="space-y-8">
                  {projects.map((project) => (
                    <li key={project.id} className="group hover:translate-x-1 transition-all duration-300 ease-out">
                      <div className="flex items-baseline justify-between mb-1">
                        <h3 className="text-md font-medium">{project.title}</h3>
                        <div className="flex flex-row gap-2">
                          {project.github ? (
                            <CustomLink
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                              track={`${project.title}_github_clicked`}
                            >
                              GitHub <ExternalLink className="w-3 h-3" />
                            </CustomLink>
                          ) : null}
                          {project.link ? (
                            <CustomLink
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                              track={`${project.title}_clicked`}
                            >
                              View <ExternalLink className="w-3 h-3" />
                            </CustomLink>
                          ) : null}
                        </div>
                      </div>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {(project.technologies ?? []).map((tech, techIndex) => (
                          <span key={techIndex} className="text-xs text-zinc-400 dark:text-zinc-500">
                            {tech}
                            {techIndex < (project.technologies?.length ?? 0) - 1 ? " /" : ""}
                          </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>

      <FooterWrapper />
    </main>
  );
}
