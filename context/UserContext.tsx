"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";
import type { User } from "@supabase/supabase-js";
import type { Account, TeamAccount, Team } from "@/types";

type UserContextType = {
  authUser: User | null;
  account: Account | null;
  teamAccounts: TeamAccount[] | null;
  teams: Team[] | null
  loading: boolean;
  setAccount: React.Dispatch<React.SetStateAction<Account | null>>;
  setTeams: React.Dispatch<React.SetStateAction<Team[] | null>>;
  setTeamAccounts: React.Dispatch<React.SetStateAction<TeamAccount[] | null>>;
};

const UserContext = createContext<UserContextType>({
  authUser: null,
  account: null,
  loading: true,
  teamAccounts: null,
  teams: null,
  setAccount: () => {},
  setTeams: () => {},
  setTeamAccounts: () => {}
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [teamAccounts, setTeamAccounts] = useState<TeamAccount[] | null>(null);
  const [teams, setTeams] = useState<Team[] | null>(null)
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
        setTeamAccounts(null)
        setLoading(false);
        return;
      }

      setAuthUser(user);

      const { data: accountData, error: accountError } = await supabase
        .from("accounts")
        .select("*")
        .eq("id", user.id)
        .single();
      if (accountError || !accountData) {
        setAccount(null)
        setTeamAccounts(null)
        setLoading(false)
        return;
      } else {
        setAccount(accountData);
      }

      const { data: teamAccountsData, error: teamAccountsError} = await supabase.from('team_accounts').select('*').eq('account_id', user.id);
      if (teamAccountsError || !teamAccountsData) {
        setTeamAccounts(null)
        setLoading(false)
        return;
      } else {
        setTeamAccounts(teamAccountsData)
      }

      const teamIds = teamAccountsData.map((t) => t.team_id)

      const { data: teamsData, error: teamsError} = await supabase.from('teams').select('*').in('id', teamIds)

      if (teamsError || !teamsData) {
        setLoading(false)
        return
      } else {
        setTeams(teamsData)
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
    <UserContext.Provider value={{ authUser, account, setAccount, teams, setTeams, teamAccounts, setTeamAccounts, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
