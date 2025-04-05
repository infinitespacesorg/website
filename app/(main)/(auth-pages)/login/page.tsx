"use client";
import { useUser } from "@/context/UserContext";
import SignIn from "../sign-in/page";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { parseMessageFromSearchParams } from "@/lib/utils";

export default function Login() {
  const { user, loading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  // if there's a user, redirect to /account
  useEffect(() => {
    if (!loading && user) {
      router.push("/account");
    }
  }, [user, loading, router]);

  if (loading || user) return null;

  // if there isn't a user, then show the sign in page
  const message = parseMessageFromSearchParams(searchParams);

  return (
    <main className="w-80 m-auto">
      <SignIn message={message} />
    </main>
  );
}
