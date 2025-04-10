"use client";
import { useUser } from "@/context/UserContext";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { parseMessageFromSearchParams } from "@/lib/utils";

function LoginView() {
  const searchParams = useSearchParams();
  const rawMessage = parseMessageFromSearchParams(searchParams);
  const message = rawMessage ?? null;
  const view = searchParams.get("view") || "signin";

  if (view === "forgot") return <ForgotPassword message={message} />;
  if (view === "signup") return <SignUp message={message} />;
  return <SignIn message={message} />;
}

export default function Login() {
  const { authUser, loading } = useUser();
  const router = useRouter();
  

  // if there's a user, redirect to /account
  useEffect(() => {
    if (!loading && authUser) {
      router.push("/account");
    }
  }, [authUser, loading, router]);

  if (loading || authUser) return null;

  

  // if there isn't a user, then show the sign in page
  return (
    <main className="w-80 m-auto py-16">
      <Suspense>
        <LoginView/>
      </Suspense>
    </main>
  );
}
