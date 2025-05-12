"use client";

import Link from "next/link";
import Logo from "@/components/logo";
import MobileNav from "@/components/header/index-nav/mobile-nav";
import DesktopNav from "@/components/header/index-nav/desktop-nav";
import { ModeToggle } from "@/components/menu-toggle";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import WaitlistForm from "./waitlist-form";

const navItems = [
  {
    label: "Home",
    href: "/",
    target: false,
  },
  {
    label: "Blog",
    href: "/blog",
    target: false,
  },
  {
    label: "About",
    href: "/about",
    target: false,
  },
];

export default function IndexHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [waitlistFormOpen, setWaitlistFormOpen] = useState(false);

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
        <Link href="/" aria-label="Home page" className="hidden md:block">
          <Logo mobile={false} />
        </Link>
        <Link href="/" aria-label="Home page" className="block md:hidden">
          <Logo mobile={true} />
        </Link>
        <div
          className={`hidden md:flex gap-3 items-center justify-between ${isScrolled ? "" : "text-gray-400 dark:text-white rounded-sm"}`}
        >
          <Button  key='waitlist' onClick={() => setWaitlistFormOpen(!waitlistFormOpen)}>Join the Waitlist</Button>
          <ModeToggle />
          <DesktopNav navItems={navItems} isScrolled={isScrolled} />
        </div>
        <div
          className={`flex items-center md:hidden ${isScrolled ? "" : "text-gray-400 dark:text-white"}`}
        >
          <Button key='waitlist' onClick={() => setWaitlistFormOpen(!waitlistFormOpen)}>Join the Waitlist</Button>
          <ModeToggle />
          <MobileNav navItems={navItems} />
        </div>
      </div>
      <WaitlistForm waitlistFormOpen={waitlistFormOpen} setWaitlistFormOpen={setWaitlistFormOpen}/>
    </header>
  );
}
