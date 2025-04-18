"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";

function AuthSyncHandler () {
  const next = useSearchParams().get("next") || "/";

  useEffect(() => {
    window.location.replace(next);
  }, [ next]);

  return null
}

export default function AuthSync() {
  

  return (
    <main className="flex items-center justify-center h-screen">
      <p className="text-muted-foreground text-sm">Working...</p>
      <Suspense>
        <AuthSyncHandler />
      </Suspense>
    </main>
  );
}
