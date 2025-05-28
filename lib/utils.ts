import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const calculateWordCount = (text: string) => {
  return text.trim().split(/\s+/).length;
};

export const calculateReadingTime = (
  wordCount: number,
  wordsPerMinute = 200,
) => {
  return Math.ceil(wordCount / wordsPerMinute);
};

export const calculateCharCount = (text: string) => {
  return text.length;
};
