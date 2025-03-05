import Link from "next/link";
import { NavItem } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { AlignRight, XIcon } from "lucide-react";
import { ModeToggle } from "../menu-toggle";
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
  // check out DropdownMenu.Sub https://www.radix-ui.com/primitives/docs/components/dropdown-menu#with-submenus if we want to put the ModeToggle inside the DropdownMenu

  // some styles are commented out so that the hamburger menu can more closely match the ModeToggle menu

  return (
    <div className={clsx("hidden xl:flex items-center gap-1 text-primary")}>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}
       modal={false} // this allows the scrollbar to remain usable
        >
        <DropdownMenuTrigger asChild className={clsx(`mx-3 ${isScrolled ? '' : 'text-white'}`)}>
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
              // { "bg-background": isScrolled, "bg-transparent": !isScrolled }
            )}
          >
            {navItems.map((navItem) => (
              <DropdownMenuItem
                className={clsx(`px-2 w-30 p-1 m-1.5 text-right rounded-sm hover:bg-gray-100`)}
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