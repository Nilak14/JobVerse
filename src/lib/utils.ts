import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict, format } from "date-fns";
import { JobServerData } from "./prisma-types/Job";
import { JobSchemaType } from "@/schema/CreateJobSchema";
// tailwind merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// get time distance (e.g. 1 hour ago)

export const getTimeDistance = (from: Date) => {
  return formatDistanceToNowStrict(from);
};

export const formatDate = (date: Date) => {
  return format(date, "MMM dd, yyyy");
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

export function mapToJobValues(data: JobServerData): JobSchemaType {
  const { Salary } = data;
  const minSalaryAmount = convertToString(Salary?.minAmount);
  const maxSalaryAmount = convertToString(Salary?.maxAmount);
  const amount = convertToString(Salary?.amount);

  return {
    id: data.id,
    title: data.title || "",
    jobType: data.jobType || "",
    workMode: data.workMode || "",
    location: data.location || "",
    categoryId: data.categoryId || "",
    subCategoryId: data.subcategoryId || "",
    experienceLevel: data.experienceLevel || "",
    totalHeads: data.totalHeads || "",
    salaryType: Salary?.type || "",
    minSalaryAmount: minSalaryAmount,
    maxSalaryAmount: maxSalaryAmount,
    amount: amount,
    salaryCurrency: Salary?.currency || "",
    salaryRate: Salary?.rate || "",
    benefits: data.benefits || [],
    description: data.description || "",
    tags: data.tags || [],
    skills: data.skills || [],
    educationLevel: data.minEducationRequired || "",
    preferredGender: data.preferredGender || "",
    license: data.licenseRequired || "",
    vehicle: data.vehicleRequired || "",
    resumeRequired: data.resumeRequired || false,
    isUrgent: data.isUrgent || false,
    applicationDeadline: data.deadline || null,
    getEmailNotification: data.sendEmailNotification || false,
  };
}

export function convertToString(value: number | null | undefined): string {
  if (!value) {
    return "";
  }
  return value.toString();
}

export const formatNumber = (n: number): string => {
  // if (n < 10000) {
  //   return n.toLocaleString("en-US"); // Keep exact numbers below 10,000
  // }

  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1, // More precision for millions+
  }).format(n);
};
