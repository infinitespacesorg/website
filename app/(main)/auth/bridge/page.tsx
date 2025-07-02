"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createClient as createAuthClient } from "@/lib/S3-canvas/client";
import { useUser } from "@/context/UserContext";

const supabaseAuth = createAuthClient();

console.log('supabaseAuth', supabaseAuth)

function BridgeHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const next = searchParams.get("next") || "/account/profile";
  const sessionParam = searchParams.get("session");
  const { refreshUserContext, authUser } = useUser();

  useEffect(() => {
    const syncSession = async () => {
      if (sessionParam) {
        try {
          const decoded = JSON.parse(atob(decodeURIComponent(sessionParam)));

          const { access_token, refresh_token } = decoded;

          const { data, error } = await supabaseAuth.auth.setSession({
            access_token,
            refresh_token,
          });

          if (error) {
            console.error("❌ Failed to set session:", error);
            return;
          }

          console.log("✅ Session set via setSession:", data);
        } catch (err) {
          console.error("❌ Failed to decode session:", err);
          return;
        }
      }

      await refreshUserContext();

      setTimeout(() => {
        if (authUser) {
          router.replace(next);
        } else {
          console.warn("Still no authUser after refresh — not redirecting.");
        }
      }, 100);
    };

    syncSession();
  }, [sessionParam, next, router, refreshUserContext, authUser]);

  return null;
}

export default function BridgePage() {
  return (
    <main className="flex items-center justify-center h-screen">
      <p className="text-muted-foreground text-sm">Syncing session...</p>
      <Suspense fallback={null}>
        <BridgeHandler />
      </Suspense>
    </main>
  );
}
