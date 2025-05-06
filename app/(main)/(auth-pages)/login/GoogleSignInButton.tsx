"use client";

import { useRouter } from "next/navigation";
import Script from "next/script";
import { useEffect, useRef } from "react";
import { CredentialResponse } from "google-one-tap";
import { useUser } from "@/context/UserContext";
import { supabase } from "@/lib/supabase/browser";

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
if (!clientId) throw new Error("Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID");

type GoogleSignInButtonProps = {
  setSignInLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export default function GoogleSignInButton({setSignInLoading}: GoogleSignInButtonProps) {
  const router = useRouter();
  const initialized = useRef(false);
  const { refreshUserContext } = useUser();

  async function handleCredential (response: CredentialResponse) {

    try {
      setSignInLoading(true)
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: response.credential,
      });
      if (error) throw error;

      await refreshUserContext();
      router.push("/account");
      setSignInLoading(false)
    } catch (err) {
      console.error('Google Sign-In error:', err)
    }
  }

  function renderGoogleButton () {
    if (initialized.current || !window.google?.accounts?.id) return
    initialized.current = true

    window.google.accounts.id.initialize({
      client_id: clientId!,
      callback: handleCredential,
    })

    window.google.accounts.id.renderButton(
      document.getElementById('google-signin-button')!,
      {
        theme: 'outline',
        size: 'large',
        type: 'standard',
        shape: 'pill',
        text: 'continue_with',
      }
    )
  }

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onError={(e) => console.error("Google Sign-In script load error", e)}
        onLoad={renderGoogleButton}
      />
      <div id="google-signin-button" className="my-4 mx-auto w-fit" />
    </>
  );
}
