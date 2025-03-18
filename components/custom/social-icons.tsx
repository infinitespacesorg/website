import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faYoutube, faBluesky } from "@fortawesome/free-brands-svg-icons";

interface SocialIconsProps {
    className: string;
}

const navItems = [
    {
      label: "Bluesky",
      icon: faBluesky,
      class: "hover:text-blue-500",
      href: "https://bsky.app/profile/infinitespaces.bsky.social",
      target: true,
    },
    {
      label: "Instagram",
      icon: faInstagram,
      class: "hover:text-pink-500",
      href: "https://www.instagram.com/infinite.spaces/",
      target: true,
    },
    {
      label: "Facebook",
      icon: faFacebook,
      class: "hover:text-red-500",
      href: "https://www.facebook.com/InfiniteSpacesCreatives",
      target: true,
    },
    {
      label: "YouTube",
      icon: faYoutube,
      class: "hover:text-blue-700",
      href: "https://www.youtube.com/@infinite.spaces",
      target: true,
    },
];

export default function SocialIcons ({className = ''}: SocialIconsProps) {
    return (
        <div className={className}>
            {navItems.map((navItem) => (
                <Link
                key={navItem.label}
                href={navItem.href}
                target={navItem.target ? "_blank" : undefined}
                rel={navItem.target ? "noopener noreferrer" : undefined}
                >
                    <FontAwesomeIcon icon={navItem.icon} className={`${navItem.class} w-4 h-4 text-gray-700 dark:text-gray-300`} />
                </Link>
            ))}
        </div>
    )
}
