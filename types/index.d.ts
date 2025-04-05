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
