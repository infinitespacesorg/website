"use client";
import { useUser } from "@/context/UserContext";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { parseMessageFromSearchParams } from "@/lib/utils";
import OneTapComponent from "./GoogleOneTap";
import GoogleSignInButton from "./GoogleSignInButton";

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
  const { authUser, account, loading } = useUser();
  const router = useRouter();

  const [signInLoading, setSignInLoading] = useState(false);

  // if there's a user, redirect to /account
  useEffect(() => {
    if (!loading && authUser) {
      router.push("/account");
    }
  }, [authUser, loading, router]);

  if (loading || signInLoading)
    return (
      <main className="w-80 m-auto py-16">
        <p className="text-center">loading...</p>
      </main>
    );

  // if there isn't a user, then show the sign in page
  return (
    <main className="w-80 m-auto py-16">
      <Suspense>
        <LoginView />
      </Suspense>
      <hr className="my-10 w-50 m-auto" />
      <p className="m-auto my-5 text-sm w-fit">
        or sign in / create an account with Google:
      </p>
      {/* <OneTapComponent /> */}
      {typeof setSignInLoading === "function" && (
        <GoogleSignInButton setSignInLoading={setSignInLoading} />
      )}
    </main>
  );
}
