"use client";

import { RefreshRouteOnSave } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Re-renders the page whenever a document is (auto)saved in the admin's live preview.
export function LivePreviewListener() {
  const router = useRouter();
  const [serverURL, setServerURL] = useState<string | null>(null);

  useEffect(() => {
    setServerURL(window.location.origin);
  }, []);

  if (!serverURL) return null;
  return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={serverURL} />;
}
