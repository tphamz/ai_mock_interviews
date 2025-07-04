import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const deepClone = <T>(obj: T): T => JSON.parse(JSON.stringify(obj)) as T;
