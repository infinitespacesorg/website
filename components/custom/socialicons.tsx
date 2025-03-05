import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faInstagram, faYoutube, faBluesky } from "@fortawesome/free-brands-svg-icons";

interface SocialIconsProps {
    className: string;
}

export default function SocialIcons ({className = ''}: SocialIconsProps) {
    return (
        <div className={className}>
            <FontAwesomeIcon icon={faBluesky} className={"w-10 h-10 text-gray-700 dark:text-gray-300 hover:text-blue-500"} />
            <FontAwesomeIcon icon={faInstagram} className={"w-10 h-10 text-gray-700 dark:text-gray-300 hover:text-pink-500"} />
            <FontAwesomeIcon icon={faFacebook} className={"w-10 h-10 text-gray-700 dark:text-gray-300 hover:text-red-500"} />
            <FontAwesomeIcon icon={faYoutube} className={"w-10 h-10 text-gray-700 dark:text-gray-300 hover:text-blue-700"} />
        </div>
    )
}