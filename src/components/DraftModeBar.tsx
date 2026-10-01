import { LivePreviewListener } from "@/components/LivePreviewListener";

export default function DraftModeBar() {
  return (
    <>
      <LivePreviewListener />
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-full bg-zinc-900 px-4 py-1.5 text-xs text-zinc-100 shadow-lg dark:bg-zinc-100 dark:text-zinc-900">
        <span>Viewing drafts</span>
        {/* Route handler, not a page — a plain anchor avoids client-side navigation. */}
        <a href="/next/exit-preview" className="underline underline-offset-2 opacity-70 hover:opacity-100">
          Exit
        </a>
      </div>
    </>
  );
}
