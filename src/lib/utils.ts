import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistance, formatDistanceToNowStrict } from "date-fns";
// tailwind merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// get time distance (e.g. 1 hour ago)

export const getTimeDistance = (from: Date) => {
  return formatDistanceToNowStrict(from);
};
