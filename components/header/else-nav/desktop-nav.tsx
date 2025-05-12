'use client'
import Link from "next/link";
import { NavItem } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { AlignRight, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import clsx from "clsx";

export default function DesktopNav({
  navItems,
  isScrolled,
}: {
  navItems: NavItem[];
  isScrolled: boolean;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className={clsx("hidden md:flex items-center gap-1 text-primary")}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}
       modal={false} // this allows the scrollbar to remain usable
        >
        <DropdownMenuTrigger asChild className={clsx(`mx-3 lig ${isScrolled ? '' : 'text-gray-400  dark:text-white'}`)}>
          <Button variant="ghost" size="icon">
            <AlignRight></AlignRight>
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuPortal>
          <DropdownMenuContent
            align="end"
            className={clsx(
              "-mx-3 my-1 z-50 rounded-sm border-1 bg-background",
            )}
          >
            {navItems.map((navItem) => (
              <DropdownMenuItem
                className={clsx(`px-2 w-30 p-1 m-1.5 text-right rounded-sm hover:bg-gray-100 dark:hover:bg-gray-800`)}
                key={navItem.label}
                onSelect={() => {
                  setIsOpen(false)
                  router.push(navItem.href);
                }}
              >
                  <Link
                    onClick={(e) => {
                      e.preventDefault();
                      setIsOpen(false);
                      router.push(navItem.href);
                    }}
                    href={navItem.href}
                    target={navItem.target ? "_blank" : undefined}
                    rel={navItem.target ? "noopener noreferrer" : undefined}
                    className={clsx(
                      "block w-full transition-colors hover:text-foreground/80 text-foreground/90 text-sm",
                      // isScrolled ? "text-black" : "text-white"
                    )}
                  >
                    {navItem.label}
                  </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenuPortal>
      </DropdownMenu>
    </div>
  );
}