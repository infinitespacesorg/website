"use client";

import { useUser } from "@/context/UserContext";
import { useEffect, useState, useCallback } from "react";
import FullNameForm from "./fullNameForm";
import UsernameForm from "./usernameForm";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { deleteAccountAction } from "../../(auth-pages)/actions";

export default function Account() {
  const [hasFullName, setHasFullName] = useState(false);
  const [showUpsertFullName, setShowUpsertFullName] = useState(false);
  const [showUpsertUsername, setShowUpsertUsername] = useState(false);

  const router = useRouter();
  const { authUser, account, loading } = useUser();

  useEffect(() => {
    if (!loading && !authUser) {
      router.push("/login");
    }
  }, [account, loading]);

  useEffect(() => {
    if (account?.full_name) setHasFullName(true);
  }, [account]);

  console.log(authUser, account);

  return (
    <section className="py-15 max-w-[800px] m-auto">
      {!loading && account && (
        <div>
          <h1 className="text-center">Account</h1>

          <div className="text-center">
            <h2>Hello, {hasFullName ? account?.full_name : "new user"}!</h2>
          </div>
          <div className="w-fit max-w-[600px] my-5 m-auto flex flex-row justify-center align-baseline gap-5">
            {showUpsertFullName && <FullNameForm />}
            {showUpsertUsername && <UsernameForm />}
            {(showUpsertFullName || showUpsertUsername) && (
              <Button
                className="block h-9 w-fit m-auto"
                size="sm"
                onClick={() => {
                  setShowUpsertFullName(false);
                  setShowUpsertUsername(false);
                }}
              >
                nevermind
              </Button>
            )}
          </div>
          {!showUpsertUsername && !showUpsertFullName && (
            <div className="w-80 m-auto flex flex-row justify-between align-baseline">
              <a onClick={() => setShowUpsertFullName(true)}>Edit Full Name</a>
              <a onClick={() => setShowUpsertUsername(true)}>Edit Username</a>
            </div>
          )}
          <div className="w-fit m-auto my-5">
            <Button onClick={() => deleteAccountAction(account.id)}>
              Delete Account
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
