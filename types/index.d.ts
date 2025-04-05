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
};