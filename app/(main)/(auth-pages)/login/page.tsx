"use client";
import { useUser } from "@/context/UserContext";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { parseMessageFromSearchParams } from "@/lib/utils";

export default function Login() {
  const { authUser, account, loading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();

  // if there's a user, redirect to /account
  useEffect(() => {
    if (!loading && authUser) {
      router.push("/account");
    }
  }, [authUser, loading, router]);

  if (loading || authUser) return null;

  const rawMessage = parseMessageFromSearchParams(searchParams);
  const message = rawMessage ?? null;
  const view = searchParams.get("view") || "signin";

  // if there isn't a user, then show the sign in page
  return (
    <main className="w-80 m-auto py-16">
      {view === "forgot" ? (
        <ForgotPassword message={message}/>
      ) : view === "signup" ? (
        <SignUp message={message} />
      ) : (
        <SignIn message={message} />
      )}
    </main>
  );
}
