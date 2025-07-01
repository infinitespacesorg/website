"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/lib/S3-canvas/client";
import { supabase } from "@/lib/supabase/browser";
import type { User } from "@supabase/supabase-js";
import type { Account, Project, ProjectProfile } from "@/types";

const supabasePlaybox = createClient();

type UserContextType = {
  authUser: User | null;
  account: Account | null;
  projectProfiles: ProjectProfile[];
  projects: Project[];
  loading: boolean;
  setAccount: React.Dispatch<React.SetStateAction<Account | null>>;
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  setProjectProfiles: React.Dispatch<React.SetStateAction<ProjectProfile[]>>;
  refreshUserContext: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  authUser: null,
  account: null,
  loading: true,
  projectProfiles: [],
  projects: [],
  setAccount: () => {},
  setProjects: () => {},
  setProjectProfiles: () => {},
  refreshUserContext: async () => {},
});

export const UserProvider = ({
  children,
  initialUser = null,
}: {
  children: React.ReactNode;
  initialUser?: User | null;
}) => {
  const [authUser, setAuthUser] = useState<User | null>(initialUser);
  const [account, setAccount] = useState<Account | null>(null);
  const [projectProfiles, setProjectProfiles] = useState<ProjectProfile[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshUserContext = async () => {
    setLoading(true);

    console.log("refreshing user context");

    const session = await supabasePlaybox.auth.getSession();
    console.log("session", session);

    await new Promise((resolve) => setTimeout(resolve, 100));

    const {
      data: { user },
      error: userError,
    } = await supabasePlaybox.auth.getUser();

    console.log("user, userError", user, userError);

    if (userError || !user) {
      setAuthUser(null);
      setAccount(null);
      setProjectProfiles([]);
      setProjects([]);
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
      setAccount(null);
      setProjectProfiles([]);
      setProjects([]);
      setLoading(false);
      return;
    } else {
      setAccount(accountData);
    }

    const { data: projectProfilesData, error: projectProfilesError } =
      await supabase
        .from("project_profiles")
        .select("*")
        .eq("account_id", user.id)
        .order("updated_at", { ascending: false });
    if (projectProfilesError || !projectProfilesData) {
      setProjectProfiles([]);
      setProjects([]);
      setLoading(false);
      return;
    } else {
      setProjectProfiles(projectProfilesData);
    }

    const projectIds = projectProfilesData.map((t) => t.project_id);
    const { data: projectsData, error: projectsError } = await supabase
      .from("projects")
      .select("*")
      .in("id", projectIds)
      .order("updated_at", { ascending: false });

    if (projectsError || !projectsData) {
      setProjects([]);
      setLoading(false);
      return;
    } else {
      setProjects(projectsData);
    }

    setLoading(false);
  };

  useEffect(() => {
    const { data: subscription } = supabasePlaybox.auth.onAuthStateChange(
      async () => {
        await refreshUserContext();
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        authUser,
        account,
        setAccount,
        projectProfiles,
        setProjectProfiles,
        projects,
        setProjects,
        loading,
        refreshUserContext,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
