"use client";

import Link from "next/link";
import Logo from "@/components/logo";
import { NavItem } from "@/types";
import MobileNav from "@/components/header/mobile-nav";
import DesktopNav from "@/components/header/desktop-nav";
import { ModeToggle } from "@/components/menu-toggle";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navItems, setNavItems] = useState<NavItem[]>([
    { label: "Home", href: "/", target: false },
    { label: "Blog", href: "/blog", target: false },
    { label: "About", href: "/about", target: false },
    { label: "Login", href: "/login", target: false },
  ]);

  const { authUser, account } = useUser();

  useEffect(() => {
    if (authUser) {
      setNavItems((items) => [
        { label: "Home", href: "/", target: false },
    { label: "Blog", href: "/blog", target: false },
    { label: "About", href: "/about", target: false },
    { label: "Account", href: "/account", target: false },
    { label: "Sign Out", action: "signOut" },
      ]);
    }
  }, [authUser]);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else setIsScrolled(false);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`top-0 w-full border-border/40 bg-background/95 z-50 ${isScrolled ? "fixed bg-white dark:bg-background" : "absolute bg-transparent"}`}
    >
      <div className="flex items-center justify-between h-14">
        <Link href="/" aria-label="Home page">
          <Logo />
        </Link>
        <div
          className={`hidden md:flex gap-1 items-center justify-between ${isScrolled ? "" : "text-gray-400 dark:text-white rounded-sm"}`}
        >
          <ModeToggle />
          <DesktopNav navItems={navItems} isScrolled={isScrolled} />
        </div>
        <div
          className={`flex items-center md:hidden ${isScrolled ? "" : "text-gray-400 dark:text-white"}`}
        >
          <ModeToggle />
          <MobileNav navItems={navItems} />
        </div>
      </div>
    </header>
  );
}
