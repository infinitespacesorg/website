import Link from "next/link";
import { NavItem } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "../ui/button";
import { AlignRight, XIcon } from "lucide-react";
import { ModeToggle } from "../menu-toggle";

export default function DesktopNav({
  navItems,
  isScrolled,
}: {
  navItems: NavItem[];
  isScrolled: boolean;
}) {
  return (
    <div className="hidden xl:flex items-center gap-7 text-primary">
      <DropdownMenu >
        <DropdownMenuTrigger asChild className="mx-3">
          <Button variant="ghost" size="icon">
            <AlignRight></AlignRight>
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className={`-mx-3 ${isScrolled ? "bg-background" : "bg-transparent"}`}>
          {navItems.map((navItem) => (
            <DropdownMenuItem className={`px-5 p-2 text-right`} key={navItem.label} >
              <Link
                href={navItem.href}
                target={navItem.target ? "_blank" : undefined}
                rel={navItem.target ? "noopener noreferrer" : undefined}
                className={`transition-colors hover:text-foreground/80 text-foreground/60 text-sm ${isScrolled ? "text-black" : "text-white"}`}
              >
                {navItem.label}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuItem className={`text-right px-3 p-1 ${isScrolled ? "text-black" : "text-white"}`}>
            <ModeToggle/>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
