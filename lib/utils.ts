import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const EVENT_API_MAIN = "https://loket-rest-api.vercel.app";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
