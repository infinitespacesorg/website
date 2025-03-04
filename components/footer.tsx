"use client";
import Link from "next/link";
import Logo from "@/components/logo";
import { useState } from "react";
import ContactDialog from "./custom/contactdialog";
import { Button } from "./ui/button";
import clsx from "clsx";
import SocialIcons from "./custom/socialicons";

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
  {
    label: "Careers",
    href: "/careers",
    target: false,
  },
];

export default function Footer() {
  console.log("something");

  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <div className="relative z-10">
      {/* maybe this div should be its own component */}
      <div className="relative z-10">
        <SocialIcons
          className={`flex flex-col left-5 bottom-10 gap-2 fixed`}
        />
        {/* <p className={`fixed right-1/36 bottom-20 bg-gray-500 z-[5]`}>Hello!</p> */}
        <Button
          className={`fixed right-5 bottom-10 z-[5]`}
          onClick={() => setContactDialogOpen(!contactDialogOpen)}
        >
          Contact Us
        </Button>

        <ContactDialog
          contactDialogOpen={contactDialogOpen}
          setContactDialogOpen={setContactDialogOpen}
        />
      </div>
      <footer className="relative z-[100] bg-white">
        <div className="relative dark:bg-background py-5 xl:py-5 dark:text-gray-300 z-[100]">
          <Link
            className="block w-fit mx-auto"
            href="/"
            aria-label="Home page"
          >
            <Logo />
          </Link>
          <div className="pt-15 flex flex-row justify-between items-center mx-8">
            <SocialIcons className={'flex-row'}/>
            <div className=" flex flex-wrap items-center justify-center gap-7 text-primary z-50">
              {navItems.map((navItem) => (
                <Link
                  key={navItem.label}
                  href={navItem.href}
                  target={navItem.target ? "_blank" : undefined}
                  rel={navItem.target ? "noopener noreferrer" : undefined}
                  className="transition-colors hover:text-foreground/80 text-foreground/60 text-sm"
                >
                  {navItem.label}
                </Link>
              ))}
            </div>
            <Button
              key="Contact Us"
              className={
                "transition-colors text-white dark:text-black right-5 bottom-20 z-[5]"
              }
              onClick={() => setContactDialogOpen}
            >
              Contact Us
            </Button>
          </div>

          <div className="mt-8 flex flex-col lg:flex-row gap-6 justify-center text-center lg:mt-5 text-xs border-t pt-8">
            <p className="text-foreground/60">
              &copy; {getCurrentYear()} Built by Infinite Spaces
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
