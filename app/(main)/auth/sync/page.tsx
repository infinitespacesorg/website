"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function AuthSync() {
  const next = useSearchParams().get("next") || "/";

  useEffect(() => {
    window.location.replace(next);
  }, [ next]);

  return (
    <main className="flex items-center justify-center h-screen">
      <p className="text-muted-foreground text-sm">Working...</p>
    </main>
  );
}
