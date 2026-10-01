import SocialMedia from "@/components/SocialMedia";
import { ThemeToggle } from "@/components/ThemeToggle";
import FooterWrapper from "@/components/FooterWrapper";
import DraftModeBar from "@/components/DraftModeBar";
import SectionTabs from "@/components/home/SectionTabs";
import ExperienceList from "@/components/home/ExperienceList";
import ProjectList from "@/components/home/ProjectList";
import { cn } from "@/lib/utils";
import { draftMode } from "next/headers";
import { getPayload } from "payload";
import config from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";

// "Present" roles show a live duration, so re-render at least daily.
export const revalidate = 86400;

export default async function Home() {
  const { isEnabled: draft } = await draftMode();
  const payload = await getPayload({ config });

  // In draft mode (live preview) show the latest drafts; otherwise only published docs.
  const versionQuery = draft ? { draft: true } : { where: { _status: { equals: "published" } } as const };

  const [profile, { docs: experience }, { docs: projects }] = await Promise.all([
    payload.findGlobal({ slug: "profile" }),
    payload.find({ collection: "experience", ...versionQuery, sort: "-startDate", limit: 100 }),
    payload.find({ collection: "projects", ...versionQuery, sort: "_order", limit: 100 }),
  ]);

  return (
    <main className="text-zinc-900 dark:text-zinc-100 max-w-xl mx-auto px-4 py-4 min-h-svh flex flex-col justify-between">
      {draft ? <DraftModeBar /> : null}
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

        <SectionTabs
          sections={[
            { value: "experience", label: "Experience", content: <ExperienceList experience={experience} /> },
            { value: "projects", label: "Projects", content: <ProjectList projects={projects} /> },
          ]}
        />
      </div>

      <FooterWrapper />
    </main>
  );
}
