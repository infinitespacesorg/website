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
  website: string | null;
  created_at: string;
  profile_image: string;
};

export type TeamAccount = {
  id: string;
  created_at: string;
  account_id: string;
  team_id: string;
  role: string;
  joined_at: string;
  team_username: string;
}

export type Team = {
  id: string;
  created_at: string;
  name: string;
  created_by: string;
  team_profile_image: string;
}