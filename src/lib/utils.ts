import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict, format } from "date-fns";
import { JobServerData } from "./prisma-types/Job";
import { JobSchemaType } from "@/schema/CreateJobSchema";
import { ResumeServerData } from "./prisma-types/Resume";
import { ResumeValues } from "@/schema/ResumeEditorSchema";
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

export function mapToResumeValues(data: ResumeServerData): ResumeValues {
  return {
    id: data.id,
    title: data.title || undefined,
    description: data.description || undefined,
    photo: data.photoUrl || undefined,
    fullName: data.fullName || undefined,
    jobTitle: data.jobTitle || undefined,
    city: data.city || undefined,
    country: data.country || undefined,
    phone: data.phone || undefined,
    email: data.email || undefined,
    workExperiences: data.workExperiences.map((exp) => ({
      position: exp.position || undefined,
      company: exp.company || undefined,
      startDate: exp.startDate?.toISOString().split("T")[0],
      endDate: exp.endDate?.toISOString().split("T")[0],
      description: exp.description || undefined,
    })),
    educations: data.educations.map((edu) => ({
      degree: edu.degree || undefined,
      school: edu.school || undefined,
      startDate: edu.startDate?.toISOString().split("T")[0],
      endDate: edu.endDate?.toISOString().split("T")[0],
    })),
    skills: data.skills,
    borderStyle: data.borderStyle,
    colorHex: data.colorHex,
    summary: data.summary || undefined,
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

export const createArray = (length: number): number[] => {
  return Array.from({ length }, (_, i) => i);
};
export const renderSalaryText = ({
  maxAmount,
  startingAmount,
  exactAmount,
  displayType,
  currency = "Rs.",
}: {
  maxAmount?: number | null;
  startingAmount?: number | null;
  exactAmount?: number | null;
  displayType: "Maximum" | "Starting" | "Range" | "Exact" | null;
  currency?: string | null;
}) => {
  switch (displayType) {
    case "Maximum":
      return `upto ${currency} ${formatNumber(exactAmount || 0)}`;
    case "Starting":
      return `from ${currency} ${formatNumber(exactAmount || 0)}`;
    case "Range":
      if (startingAmount && maxAmount) {
        return `${currency} ${formatNumber(startingAmount)} - ${currency} ${formatNumber(maxAmount)}`;
      }
      return "";
    case "Exact":
      return `${currency} ${formatNumber(exactAmount || 0)}`;
    default:
      return "";
  }
};

export function fileReplacer(key: unknown, value: unknown) {
  return value instanceof File
    ? {
        name: value.name,
        size: value.size,
        type: value.type,
        lastModified: value.lastModified,
      }
    : value;
}
