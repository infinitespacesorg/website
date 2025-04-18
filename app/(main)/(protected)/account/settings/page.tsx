"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  resetPasswordAction,
  deleteAccountAction,
  updateEmailAddress,
} from "../../actions";
import { useUser } from "@/context/UserContext";
import { signOutAction } from "@/app/(main)/(auth-pages)/actions";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
  const { authUser, account, setAccount, teamAccounts, teams, loading } =
    useUser();

  console.log(authUser);

  const [googleAuth, setGoogleAuth] = useState(false);

  useEffect(() => {
    if (authUser?.app_metadata.provider === "google") {
      setGoogleAuth(!googleAuth);
    }
  }, [authUser]);

  async function handleEmailUpdate(e: React.FormEvent<HTMLFormElement>) {
    // hey this one doesn't work yet
    e.preventDefault();
  
    const formData = new FormData(e.currentTarget);
  
      try {
        // await updateEmailAction(formData);
  
        toast.success("Email updated!!");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Something went wrong";
        toast.error(errorMessage);
      }
    };

  async function handlePasswordSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  
    const formData = new FormData(e.currentTarget);
  
      try {
        await resetPasswordAction(formData);
  
        toast.success("Check your email for a password reset link!");
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Something went wrong";
        toast.error(errorMessage);
      }
    };

  function loadingOrNot() {
    return authUser ? (
      <section>
        <h1 className="text-3xl my-3">Settings</h1>
        <hr className="my-3" />

        <div className="flex flex-row justify-between align-baseline">
          <div>
            <h4>Email Address</h4>
            <p className="text-sm">{authUser?.email}</p>
          </div>
          {/* hey this doesn't work yet, I'm not sure how to update the email address if a user signed in through Google */}
          {!googleAuth ? (
            <div className="w-fit my-auto">
              <form onSubmit={handleEmailUpdate}>
                <Input
                  type="hidden"
                  name="accountEmail"
                  value={authUser?.email}
                />
                <Button type="submit">Update Email Address</Button>
              </form>
            </div>
          ) : 
          <p className="w-fit my-auto">Account created with Google Sign In</p>}
        </div>
        <hr className="my-3" />
        {!googleAuth ? (
          <div className="flex flex-row justify-between align-baseline">
            <div>
              <h4>Password</h4>
              <p className="text-sm">Set or reset password for your account</p>
            </div>
            <div className="w-fit my-auto">
              <form onSubmit={handlePasswordSubmit}>
                <Input
                  type="hidden"
                  name="accountEmail"
                  value={authUser?.email}
                />
                <Button type="submit">Reset Password</Button>
              </form>
            </div>
          </div>
        ) : null}
        <hr className="my-3 mt-30" />
        <div className="flex flex-row justify-between align-baseline">
          <div>
            <h4>Sign out</h4>
            <p className="text-sm">End your current session</p>
          </div>
          <div className="w-fit my-auto">
            <form action={signOutAction}>
              <Input type="hidden" name="signOut" />
              <Button type="submit">Sign Out</Button>
            </form>
          </div>
        </div>
        <hr className="my-3" />
        <div className="flex flex-row justify-between align-baseline">
          <div>
            <h4>Delete Account</h4>
            <p className="text-sm">Remove all user and account information</p>
          </div>
          <div className="w-fit my-auto">
            <form action={deleteAccountAction}>
              <Input type="hidden" name="accountId" value={authUser?.id} />
              <Button type="submit">Delete Account</Button>
            </form>
          </div>
        </div>
      </section>
    ) : (
      <section>
        <h1 className="text-xl w-fit my-40 m-auto text-center">
          loading user data...
        </h1>
      </section>
    );
  }

  return <>{loadingOrNot()}</>;
}
