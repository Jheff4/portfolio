import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// cn() is the standard Tailwind class merging utility.
// clsx handles conditionals/arrays, twMerge resolves conflicts (p-2 p-4 → p-4).
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
