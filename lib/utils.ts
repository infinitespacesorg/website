import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { redirect } from "next/navigation";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date: string): string => {
  const dateObj = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return dateObj.toLocaleDateString("en-US", options);
};

export const creatorCategories = [
  'AI',
  'AR/VR',
  'Art',
  'Broadcast',
  'Education',
  'Entertainment',
  'Fashion',
  'Film',
  'Festivals',
  'Games',
  'Immersive Experiences',
  'Live',
  'Music',
  'Placemaker',
  'Streaming',
  'Storytelling',
  'XR',
  'Visual Production',
]

// Define the types for block content and children
type Block = {
  _type: string;
  children?: Array<{ text: string }>;
};

type BlockContent = Block[] | null;

// Helper function to extract plain text from block content
export const extractPlainText = (blocks: BlockContent): string | null => {
  if (!blocks || !Array.isArray(blocks)) return null;

  return blocks
    .map((block) => {
      if (block._type === "block" && Array.isArray(block.children)) {
        return block.children.map((child) => child.text).join("");
      }
      return "";
    })
    .join(" ");
};

export function encodedRedirect(
  type: "error" | "success",
  path: string,
  message: string,
) {
  return redirect(`${path}?${type}=${encodeURIComponent(message)}`);
}
