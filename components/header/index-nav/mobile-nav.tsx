"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { NavItem } from "@/types";
import Logo from "@/components/logo";
import { useState } from "react";
import { AlignRight } from "lucide-react";
import clsx from "clsx";
import SocialIcons from "@/components/custom/social-icons";
import { signOutAction } from "@/app/(main)/(auth-pages)/actions";

export default function MobileNav({ navItems }: { navItems: NavItem[] }) {
  const [open, setOpen] = useState(false);

  function allNavItems() {
    return navItems.map((navItem, i) => {
      if ("action" in navItem && navItem.action === "signOut") {
        return (
          <li
            key={navItem.label}
          >
            <button
              type="button"
              onClick={async () => {
                await signOutAction();
              }}
              className="block w-full text-3xl text-foreground/90 hover:text-foreground/80 transition-colors"
            >
              {navItem.label}
            </button>
          </li>
        );
      } else if ("href" in navItem) {
        return (
          <li key={navItem.label}>
            <Link
              onClick={() => setOpen(false)}
              href={navItem.href}
              target={navItem.target ? "_blank" : undefined}
              rel={navItem.target ? "noopener noreferrer" : undefined}
              className="hover:text-decoration-none hover:opacity-50 text-3xl"
            >
              {navItem.label}
            </Link>
          </li>
        );
      }
    });
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          aria-label="Open Menu"
          variant="ghost"
          className="w-10 p-5 focus-visible:ring-1 focus-visible:ring-offset-1"
        >
          <AlignRight className="dark:text-white text-gray-400" />
        </Button>
      </SheetTrigger>
      <SheetContent className={clsx("width: 100vw")}>
        <SheetHeader>
          <div className="mx-auto">
            <Logo mobile={true} />
          </div>
          <div className="sr-only">
            <SheetTitle>Main Navigation</SheetTitle>
            <SheetDescription>Navigate to the website pages</SheetDescription>
          </div>
        </SheetHeader>
        <div className="pt-10 pb-20">
          <div className="container">
            <ul className="list-none text-center space-y-10">
              {allNavItems()}
            </ul>
          </div>
        </div>
        <div className="py-10">
          <div className="container">
            <SocialIcons
              mobileNav={true}
              className="flex flex-row justify-between items-center w-[60vw] m-auto"
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
