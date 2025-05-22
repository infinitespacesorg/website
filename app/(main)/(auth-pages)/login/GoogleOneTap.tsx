'use client'

// we're not using this component because you can't really style it,
// and it doesn't behave as nicely as the GoogleSignInButton

import Script from 'next/script'
import { supabase } from '@/lib/supabase/browser'
import { CredentialResponse } from "google-one-tap"
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
if (!clientId) throw new Error("Missing NEXT_PUBLIC_GOOGLE_CLIENT_ID");

const OneTapComponent = () => {
  const router = useRouter()
  const initializedRef = useRef(false)

  // generate nonce to use for google id token sign-in
  const generateNonce = async (): Promise<string[]> => {
    const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))))
    const encoder = new TextEncoder()
    const encodedNonce = encoder.encode(nonce)
    const hashBuffer = await crypto.subtle.digest('SHA-256', encodedNonce)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashedNonce = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')

    return [nonce, hashedNonce]
  }

  const initializeGoogleOneTap = async () => {
    if (initializedRef.current || !window.google?.accounts?.id) return
    initializedRef.current = true

    const [nonce, hashedNonce] = await generateNonce()

    const { data: sessionData, error } = await supabase.auth.getSession()
    if (error) console.error('Session check error', error)
    if (sessionData.session) return

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: async (response: CredentialResponse) => {
        try {
          const { data, error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            token: response.credential,
            nonce,
          })

          if (error) throw error
          router.push('/')
        } catch (err) {
          console.error('Google One Tap login failed', err)
        }
      },
      nonce: hashedNonce,
      use_fedcm_for_prompt: true,
    })

    window.google.accounts.id.prompt()
  }

  return (
    <>
      <Script src="https://accounts.google.com/gsi/client" strategy='afterInteractive' onLoad={initializeGoogleOneTap}/>
      <div id="oneTap" className="relative h-fit z-[100]" />
    </>
  )
}

export default OneTapComponent