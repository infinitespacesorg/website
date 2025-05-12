"use client";

// we're not using this anymore, it was merely a prototype for all of the account UI

// import { useUser } from "@/context/UserContext";
// import { Suspense, useEffect, useState } from "react";
// import FullNameForm from "./profile/fullNameForm";
// import UsernameForm from "./profile/usernameForm";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useRouter, useSearchParams } from "next/navigation";
// import { deleteAccountAction, resetPasswordAction } from "./settings/actions";
// import { FormMessage, Message } from "@/components/ui/form-message";

// function MessageBanner() {
//   const searchParams = useSearchParams();
//   const message = searchParams.get("message");

//   if (!message) return null;

//   return <FormMessage message={{ message }} />;
// }

// export default function Account() {
//   const [hasFullName, setHasFullName] = useState(false);
//   const [showUpsertFullName, setShowUpsertFullName] = useState(false);
//   const [showUpsertUsername, setShowUpsertUsername] = useState(false);

//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const status = searchParams.get("status");
//   const message = searchParams.get("message");

//   const { authUser, account, projectProfiles, projects, loading } = useUser();

//   useEffect(() => {
//     if (!loading && !authUser) {
//       router.push("/login");
//     }
//   }, [account, loading]);

//   useEffect(() => {
//     if (account?.full_name) setHasFullName(true);
//   }, [account]);

//   return (
//     <section className="py-15 max-w-[800px] m-auto">
//       {!loading && account && (
//         <div>
//           <h1 className="text-center">Account</h1>
//           <Suspense>
//             <MessageBanner />
//           </Suspense>
//           <div className="text-center">
//             <h2>Hello, {hasFullName ? account?.full_name : "new user"}!</h2>
//           </div>
//           <div className="w-fit max-w-[800px] my-5 m-auto flex flex-row justify-center align-top gap-5">
//             {showUpsertFullName && <FullNameForm />}
//             {showUpsertUsername && <UsernameForm />}
//             {(showUpsertFullName || showUpsertUsername) && (
//               <Button
//                 className="block h-9 w-fit"
//                 size="sm"
//                 onClick={() => {
//                   setShowUpsertFullName(false);
//                   setShowUpsertUsername(false);
//                 }}
//               >
//                 nevermind
//               </Button>
//             )}
//           </div>
//           {!showUpsertUsername && !showUpsertFullName && (
//             <div className="w-fit m-auto flex flex-row justify-between align-baseline gap-5">
//               <Button onClick={() => setShowUpsertFullName(true)}>
//                 Edit Full Name
//               </Button>
//               <Button onClick={() => setShowUpsertUsername(true)}>
//                 Edit Username
//               </Button>
//             </div>
//           )}
//           <div className="w-fit m-auto my-5">
//             <form action={resetPasswordAction}>
//               <Input
//                 type="hidden"
//                 name="accountEmail"
//                 value={authUser?.email}
//               />
//               <Button type="submit">Reset Password</Button>
//             </form>
//           </div>
//           <div className="w-fit m-auto my-5">
//             <form action={deleteAccountAction}>
//               <Input type="hidden" name="accountId" value={account.id} />
//               <Button type="submit">Delete Account</Button>
//             </form>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }
