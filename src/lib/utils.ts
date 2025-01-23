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

type HandleError = {
  error: unknown;
  defaultMessage?: string;
  errorIn: string;
};

export const handleError = ({
  error,
  defaultMessage = "Internal Server Error",
  errorIn,
}: HandleError): { success: false; message: string } => {
  console.error(errorIn, error);

  if (error instanceof Error) {
    return { success: false, message: error.message };
  }

  return { success: false, message: defaultMessage };
};
