"use client";
import { useUser } from "@/context/UserContext";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ForgotPassword from "./ForgotPassword";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { parseMessageFromSearchParams } from "@/lib/utils";
import GoogleSignInButton from "./GoogleSignInButton";

function LoginView() {
  const searchParams = useSearchParams();
  const rawMessage = parseMessageFromSearchParams(searchParams);
  const message = rawMessage ?? null;
  const view = searchParams.get("view") || "signin";

  if (view === "forgot") return <ForgotPassword />;
  if (view === "signup") return <SignUp />;
  return <SignIn message={message} />;
}

export default function Login() {
  const { authUser, account, loading } = useUser();

    console.log(authUser, account)

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
      <main className="w-80 mx-auto pt-5 md:pt-16">
        <p className="text-center">loading...</p>
      </main>
    );

  // if there isn't a user, then show the sign in page
  return (
    <main className="w-80 mx-auto pt-5 md:pt-16">
      <Suspense>
        <LoginView />
      </Suspense>
      <hr className="my-5 md:my-10 w-50 m-auto" />
      <p className="m-auto my-5 text-sm w-fit">
        or sign in / create an account with Google:
      </p>
      {typeof setSignInLoading === "function" && (
        <GoogleSignInButton setSignInLoading={setSignInLoading} />
      )}
    </main>
  );
}
