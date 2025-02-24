import Link from "next/link";
import { NavItem } from "@/types";

export default function DesktopNav({ navItems, isScrolled }: { navItems: NavItem[], isScrolled: boolean}) {
 return (
   <div className="hidden xl:flex items-center gap-7 text-primary">
     {navItems.map((navItem) => (
       <Link
         key={navItem.label}
         href={navItem.href}
         target={navItem.target ? "_blank" : undefined}
         rel={navItem.target ? "noopener noreferrer" : undefined}
         className={`transition-colors hover:text-foreground/80 text-foreground/60 text-sm ${isScrolled ? 'text-black' : 'text-white'}`}
       >
         {navItem.label}
       </Link>
     ))}
   </div>
 );
}

