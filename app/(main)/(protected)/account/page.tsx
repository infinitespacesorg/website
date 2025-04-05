"use client"

import { useUser } from "@/context/UserContext";

export default function Account() {

  const { user } = useUser()

  console.log(user)

  return (
    <section>
      <h1>Account</h1>
    </section>
  );
}
