"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  resetPasswordAction,
  deleteAccountAction,
  updateEmailAddress,
} from "./actions";
import { useUser } from "@/context/UserContext";
import { signOutAction } from "@/app/(main)/(auth-pages)/actions";
import { useEffect, useState, useRef, useTransition } from "react";
import { toast } from "sonner";
import {
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
  Dialog,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const settingsFormsSchema = z.object({
  email: z.string().email({ message: "Please enter your email address" }),
});

export default function SettingsPage() {
  const {
    authUser,
    account,
    setAccount,
    projectProfiles,
    projects,
    loading,
    refreshUserContext,
  } = useUser();

  const [isPending, startTransition] = useTransition();
  const [googleAuth, setGoogleAuth] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [newEmail, setNewEmail] = useState(authUser?.email ?? '')
  const dialogRef = useRef<HTMLDialogElement>(null);

  console.log(authUser)

  useEffect(() => {
    if (
      authUser?.app_metadata.providers.filter((pro: string) => pro === "google")
        .length > 0
    ) {
      setGoogleAuth(true);
    }
  }, [authUser]);

  useEffect(() => {
    if (showDeleteDialog) {
      dialogRef.current?.showModal();
    }
  }, [showDeleteDialog]);

  const deleteForm = useForm<z.infer<typeof settingsFormsSchema>>({
    resolver: zodResolver(settingsFormsSchema),
    defaultValues: {
      email: "",
    },
  });

  async function handleDeleteAccount(
    values: z.infer<typeof settingsFormsSchema>
  ) {
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("accountID", authUser!.id);

    try {
      await deleteAccountAction(formData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(errorMessage);
    }
  }

  async function handleEmailUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      await updateEmailAddress(formData);

      toast.success(`Please check your new email address for a confirmation link.`);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(errorMessage);
    }
  }

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
  }

  function deleteDialog() {
    return (
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogPortal>
          <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
          <DialogContent className="fixed z-50 w-[90vw] sm:max-w-[400px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl">
            <DialogTitle className="text-xl text-center font-semibold mb-2">
              Are you sure?
            </DialogTitle>

            <DialogDescription className="mb-4 text-sm text-muted-foreground">
              Deleting your account will permanently remove all user & account
              information. If you are the sole owner of any projects, those
              projects will also be deleted.
            </DialogDescription>
            <Form {...deleteForm}>
              <form onSubmit={deleteForm.handleSubmit(handleDeleteAccount)}>
                <FormField
                  control={deleteForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Enter your email address to continue"
                          autoComplete="off"
                          data-1p-ignore
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  className="w-full mt-3"
                  size="sm"
                  type="submit"
                  disabled={isPending}
                >
                  {isPending && (
                    <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                  )}
                  Confirm & Delete
                </Button>
              </form>
            </Form>
          </DialogContent>
        </DialogPortal>
      </Dialog>
    );
  }

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
          {!googleAuth ? (
            <div>
              {showEmailForm ? (
                <div className="w-fit my-auto">
                  <form className="flex flex-row justify-between items-center gap-2" onSubmit={handleEmailUpdate}>
                    <Input type="email" name="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                    <Button type="submit">Submit</Button>
                    <Button onClick={() => setShowEmailForm(false)}>X</Button>
                  </form>
                </div>
              ) : (
                <div className="w-fit my-auto">
                    <Button onClick={() => setShowEmailForm(true)}>Update Email Address</Button>
                </div>
              )}{" "}
            </div>
          ) : (
            <p className="w-fit my-auto">Account created with Google Sign In</p>
          )}
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
            <Button
              onClick={() => {
                setShowDeleteDialog(true);
              }}
            >
              Delete Account
            </Button>
          </div>
        </div>
        {showDeleteDialog && deleteDialog()}
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
