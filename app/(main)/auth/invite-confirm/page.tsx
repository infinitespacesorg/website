"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/browser";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ConfirmInvitePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const redirectTo = searchParams.get("redirect_to");

  const [emailVerified, setEmailVerified] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const verifyInvite = async () => {
      if (!token_hash || !type) return;

      const { data, error } = await supabase.auth.verifyOtp({
        type: type as any,
        token_hash,
      });

      if (error) {
        console.error("OTP Verification failed", error);
        return;
      }

      setEmailVerified(true);
    };

    verifyInvite();
  }, [token_hash, type]);

  const handleSetPassword = async () => {
    const { data, error } = await supabase.auth.updateUser({ password });

    if (error) {
      console.error("Set password error:", error.message);
    } else {
      router.push(redirectTo || "/account");
    }
  };

  const handleGoogleSignIn = async () => {
    const origin = window.location.origin;
    const googleRedirectUrl = `${origin}/auth/callback?redirect_to=${redirectTo || "/account"}`;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: googleRedirectUrl,
      },
    });
  };

  if (!emailVerified) return <p>Verifying your invite...</p>;

  return (
    <div className="space-y-4 w-[80vw] max-w-[400px] mx-auto pt-25">
      <h2 className="text-xl font-bold text-center">Complete your signup</h2>
      <p className="text-sm text-muted-foreground">Choose how to finish setting up your Infinite Spaces account:</p>

      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Set your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className="w-full text-center" onClick={handleSetPassword}>Continue with Email</Button>
      </div>

      <hr className="my-4" />

      <Button variant="outline" className="w-full text-center" onClick={handleGoogleSignIn}>
        Continue with Google
      </Button>
    </div>
  );
}
