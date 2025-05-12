"use client";
import Link from "next/link";
import Logo from "@/components/logo";
import { useState } from "react";
import ContactDialog from "../custom/contact-dialog";
import { Button } from "../ui/button";
import clsx from "clsx";
import SocialIcons from "../custom/social-icons";
import { useRouter } from "next/navigation";

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
  // {
  //   label: "Careers",
  //   href: "/careers",
  //   target: false,
  // },
];

export default function FooterWithContactUs() {
  const router = useRouter();

  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <div className={`z-50 relative `}>
      <div className="relative z-50">
        <SocialIcons
          className={`hidden md:flex flex-col md:left-5 md:bottom-10 gap-2 fixed`}
          mobileNav={false}
        />
        <Button
          className={`hidden md:fixed md:right-5 md:bottom-10 z-[50]`}
          onClick={() => setContactDialogOpen(!contactDialogOpen)}
        >
          Contact Us
        </Button>

        <ContactDialog
          contactDialogOpen={contactDialogOpen}
          setContactDialogOpen={setContactDialogOpen}
        />
      </div>
      <footer
        className={`z-[100] bg-white ${contactDialogOpen ? "hidden" : "relative"}`}
      >
        <div className="relative dark:bg-background py-5 xl:py-5 dark:text-gray-300 z-[100]">
          <Link className="block w-fit mx-auto" href="/" aria-label="Home page">
            <Logo mobile={false} />
          </Link>
          <div className="pt-5 flex flex-col sm:flex-row gap-5 sm:gap-0 justify-between items-center mx-8">
            <SocialIcons
              className={"flex flex-row gap-7 sm:gap-3"}
              mobileNav={false}
            />
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
              onClick={() => setContactDialogOpen(!contactDialogOpen)}
            >
              Contact Us
            </Button>
          </div>

          <div className="mt-5 flex flex-col lg:flex-row gap-6 justify-center text-center text-xs border-t pt-5">
            <p className="text-foreground/60">
              &copy; {getCurrentYear()} Built by Infinite Spaces
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
