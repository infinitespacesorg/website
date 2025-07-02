"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { createClient } from "@/lib/S3-canvas/client";
const supabase = createClient()

function BridgeHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/account";

  const { authUser, refreshUserContext } = useUser();

  useEffect(() => {
    const alreadySynced = sessionStorage.getItem("supabaseBridgeSync");

    if (alreadySynced) return;

    sessionStorage.setItem("supabaseBridgeSync", "true");

    (async () => {
      const { data: session, error } = await supabase.auth.getSession();
      console.log("Client session from supabase-js", session, error);
      await refreshUserContext();

      setTimeout(() => {
        if (authUser) {
          router.replace(next);
          sessionStorage.removeItem("supabaseBridgeSync");
        } else {
          console.warn(
            "authUser not present in /auth/bridge, skipping redirect"
          );
        }
      }, 100);
    })();
  }, [authUser, next, refreshUserContext, router]);

  return null;
}

export default function BridgePage() {
  return (
    <main className="flex items-center justify-center h-screen">
      <p className="text-muted-foreground text-sm">Preparing your session...</p>
      <Suspense fallback={null}>
        <BridgeHandler />
      </Suspense>
    </main>
  );
}
