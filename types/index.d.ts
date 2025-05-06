import { string } from "zod";

export type NavItem =
  | {
    label: string;
    href: string;
    target?: boolean;
  }
  | {
    label: string;
    action: "signOut";
  };

export type BreadcrumbLink = {
  label: string;
  href: string;
};

export type Account = {
  id: string;
  full_name: string | null;
  username: string | null;
  // website: string | null;
  created_at: string;
  profile_image: string;
};

export type ProjectProfile = {
  id: string;
  created_at: string;
  updated_at: string;
  account_id: string;
  project_id: string;
  role: string;
  joined_at: string;
  project_username: string;
}

export type Project = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  created_by: string;
  project_profile_image: string;
}

type ProjectProfileWithAccount = ProjectProfile & {
  accounts: Account
};