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
      await new Promise((resolve) => setTimeout(resolve, 100));

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        setAuthUser(null);
        setAccount(null);
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
        setAccount(null);
      } else {
        setAccount(accountData);
      }

      setLoading(false);
    };

    loadUserData();

    const { data: subscription } = supabase.auth.onAuthStateChange(async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setAuthUser(user ?? null);

      if (user) {
        const { data: accountData } = await supabase
          .from("accounts")
          .select("*")
          .eq("id", user.id)
          .single();
        setAccount(accountData ?? null);
      } else {
        setAccount(null);
      }
    });

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
