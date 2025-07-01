"use client";

import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

function AuthSyncHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const next = searchParams.get("next") || "/account/profile";
  const { refreshUserContext } = useUser();

  useEffect(() => {
    (async () => {
      await refreshUserContext();
      router.replace(next);
    })();
  }, [next, refreshUserContext, router]);

  return null;
}

export default function AuthSyncPage() {
  

  return (
    <main className="flex items-center justify-center h-screen">
      <p className="text-muted-foreground text-sm">Syncing session...</p>
      <Suspense>
        <AuthSyncHandler/>
      </Suspense>
    </main>
  );
}
