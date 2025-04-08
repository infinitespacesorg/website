"use client";
import { useUser } from "@/context/UserContext";
import SignIn from "../sign-in/page";
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

  console.log(loading, authUser)

  // if there isn't a user, then show the sign in page
  const message = parseMessageFromSearchParams(searchParams);

  return (
    <main className="w-80 m-auto">
      <SignIn message={message} />
    </main>
  );
}
