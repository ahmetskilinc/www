import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { cn } from "@/lib/utils";

export default function Description({ data, className }: { data: SerializedEditorState; className?: string }) {
  return (
    <RichText
      data={data}
      className={cn(
        "prose prose-sm prose-zinc dark:prose-invert max-w-none",
        "[--tw-prose-body:var(--color-zinc-500)] dark:[--tw-prose-invert-body:var(--color-zinc-400)]",
        "[--tw-prose-bullets:var(--color-zinc-400)] dark:[--tw-prose-invert-bullets:var(--color-zinc-500)]",
        "prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0 prose-headings:mt-3 prose-headings:mb-1",
        "prose-a:font-normal prose-a:transition-colors",
        "[&>:first-child]:mt-0 [&>:last-child]:mb-0",
        className,
      )}
    />
  );
}
