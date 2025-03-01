'use client'
import Link from "next/link";
import Logo from "@/components/logo";
import { useState } from "react";
import ContactDialog from "./custom/contactdialog";
import { Button } from "./ui/button";

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

  console.log('something')

  const [contactDialogOpen, setContactDialogOpen] = useState(false)

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <div>
      {/* maybe this div should be its own component */}
      <div className={`flex flex-col left-10 bottom-20 fixed`}>
        <p>B</p>
        <p>I</p>
        <p>F</p>
        <p>Y</p>
      </div>
      <Button className={`fixed right-10 bottom-20 bg`} onClick={() => setContactDialogOpen(!contactDialogOpen)}>Let's Chat</Button>
      <ContactDialog contactDialogOpen={contactDialogOpen} setContactDialogOpen={setContactDialogOpen}/>
    <footer>
      <div className="dark:bg-background pb-5 xl:pb-5 dark:text-gray-300">
        <Link
          className="block w-[10rem] mx-auto"
          href="/"
          aria-label="Home page"
        >
          <Logo />
        </Link>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-7 text-primary">
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
          <p
            key="Contact Us"
            className={
              "transition-colors hover:text-foreground/80 text-foreground/60 text-sm"
            }
            onClick={() => setContactDialogOpen}
          >
            Contact Us
          </p>
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
