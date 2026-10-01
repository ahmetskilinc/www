import type { Experience } from "@/payload-types";
import Description from "@/components/Description";
import TechList from "@/components/home/TechList";
import { formatPeriod } from "@/utilities/formatPeriod";

function ExperienceItem({ job }: { job: Experience }) {
  const { range, duration } = formatPeriod(job);

  return (
    <li className="group hover:translate-x-1 transition-transform duration-300 ease-out">
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between mb-1">
        <h3 className="text-md font-medium">
          {job.role}
          {job.company ? ` at ${job.company}` : ""}
        </h3>
        <span className="text-xs text-zinc-400 dark:text-zinc-500 shrink-0">
          {range}
          {duration ? <span className="text-zinc-300 dark:text-zinc-600"> · {duration}</span> : null}
        </span>
      </div>
      <Description data={job.description} className="mb-2" />
      <TechList technologies={job.technologies} />
    </li>
  );
}

export default function ExperienceList({ experience }: { experience: Experience[] }) {
  return (
    <ul className="space-y-8">
      {experience.map((job) => (
        <ExperienceItem key={job.id} job={job} />
      ))}
    </ul>
  );
}
