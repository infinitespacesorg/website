// context/UserContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";
import type { User } from "@supabase/supabase-js";
import type { Account } from "@/types";

type UserContextType = {
  authUser: User | null;
  account: Account | null;
  loading: boolean;
  setAccount: React.Dispatch<React.SetStateAction<Account | null>>;
};

const UserContext = createContext<UserContextType>({
  authUser: null,
  account: null,
  loading: true,
  setAccount: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        console.error("Failed to get auth user", userError);
        setAuthUser(null)
        setAccount(null)
        setLoading(false);
        return;
      }

      setAuthUser(user);

      const { data: accountData, error: accountError } = await supabase
        .from("accounts")
        .select("*")
        .eq("id", user.id)
        .single();
      if (accountError) {
        console.error("Failed to get account info", accountError);
        setAccount(null);
      } else {
        setAccount(accountData);
      }

      setLoading(false);
    };

    loadUserData();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null;
        setAuthUser(currentUser);

        if (currentUser) {
          const { data: accountData } = await supabase
            .from("accounts")
            .select("*")
            .eq("id", currentUser.id)
            .single();
          setAccount(accountData ?? null);
        } else setAccount(null);
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ authUser, account, setAccount, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
