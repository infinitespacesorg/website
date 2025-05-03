import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { redirect } from "next/navigation";
import type { Message } from "@/components/ui/form-message";
import { Resend } from "resend"
import Favicon from "@/public/favicon.png"

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

export const resend = new Resend(`${process.env.RESEND_API_KEY}`)

export const ISLogo = Favicon

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
  status: "error" | "success",
  path: string,
  message: string,
  extraParams?: Record<string, string>
) {
  const base = path.split("?")[0];
  const existingParams = new URLSearchParams(path.split("?")[1]);
  const newParams = new URLSearchParams({
    ...Object.fromEntries(existingParams),
    status,
    message: encodeURIComponent(message),
    ...(extraParams || {}),
  });

  return redirect(`${base}?${newParams.toString()}`);
}

export function parseMessageFromSearchParams(params: URLSearchParams): Message | null {
  const msg = params.get("message");
  const status = params.get("status");

  if (!msg || !status) return null;

  if (status === "success") return { success: decodeURIComponent(msg) };
  if (status === "error") return { error: decodeURIComponent(msg) };
  return { message: decodeURIComponent(msg) };
}