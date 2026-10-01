export default function TechList({ technologies }: { technologies?: string[] | null }) {
  if (!technologies?.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {technologies.map((tech, index) => (
        <span key={index} className="text-xs text-zinc-400 dark:text-zinc-500">
          {tech}
          {index < technologies.length - 1 ? " /" : ""}
        </span>
      ))}
    </div>
  );
}
