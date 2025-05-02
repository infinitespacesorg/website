"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/browser";
import type { User } from "@supabase/supabase-js";
import type { Account, Project, ProjectProfile } from "@/types";

type UserContextType = {
  authUser: User | null;
  account: Account | null;
  projectProfiles: ProjectProfile[] | null;
  projects: Project[] | null
  loading: boolean;
  setAccount: React.Dispatch<React.SetStateAction<Account | null>>;
  setProjects: React.Dispatch<React.SetStateAction<Project[] | null>>;
  setProjectProfiles: React.Dispatch<React.SetStateAction<ProjectProfile[] | null>>;
};

const UserContext = createContext<UserContextType>({
  authUser: null,
  account: null,
  loading: true,
  projectProfiles: null,
  projects: null,
  setAccount: () => {},
  setProjects: () => {},
  setProjectProfiles: () => {}
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [account, setAccount] = useState<Account | null>(null);
  const [projectProfiles, setProjectProfiles] = useState<ProjectProfile[] | null>(null);
  const [projects, setProjects] = useState<Project[] | null>(null)
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
        setProjectProfiles(null)
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
        setProjectProfiles(null)
        setLoading(false)
        return;
      } else {
        setAccount(accountData);
      }

      const { data: projectProfilesData, error: projectProfilesError} = await supabase.from('project_profiles').select('*').eq('account_id', user.id);
      if (projectProfilesError || !projectProfilesData) {
        setProjectProfiles(null)
        setLoading(false)
        return;
      } else {
        setProjectProfiles(projectProfilesData)
      }

      const projectIds = projectProfilesData.map((t) => t.project_id)

      const { data: projectsData, error: projectsError} = await supabase.from('projects').select('*').in('id', projectIds)

      if (projectsError || !projectsData) {
        setLoading(false)
        return
      } else {
        setProjects(projectsData)
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
    <UserContext.Provider value={{ authUser, account, setAccount, projectProfiles, setProjectProfiles, projects, setProjects, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
