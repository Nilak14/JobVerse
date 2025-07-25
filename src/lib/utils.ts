import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  formatDistanceToNowStrict,
  format,
  isBefore,
  differenceInYears,
  differenceInMonths,
  differenceInDays,
} from "date-fns";
import { JobServerData } from "./prisma-types/Job";
import { JobSchemaType } from "@/schema/CreateJobSchema";
import { ResumeServerData } from "./prisma-types/Resume";
import { ResumeValues } from "@/schema/ResumeEditorSchema";
import {
  JobSeekerProfile,
  JobSeekerProfileApplication,
} from "./prisma-types/JobSeekerProfile";
import { mappings } from "./data";
import { MockInterviewDataWithFeedback } from "./prisma-types/MockInterview";
import { DateRangeValue } from "@/components/Global/DateFilters";
// tailwind merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// get time distance (e.g. 1 hour ago)

export const getTimeDistance = (from: Date) => {
  console.log(from);
  return formatDistanceToNowStrict(from);
};

export const formatDate = (date: Date) => {
  return format(date, "MMM dd, yyyy");
};

export function getTimeDifference(targetDate: Date) {
  const now = new Date();
  const target = new Date(targetDate);

  if (isBefore(target, now)) {
    return null;
  }

  const years = differenceInYears(target, now);
  if (years > 0) return `${years} year${years > 1 ? "s" : ""}`;

  const months = differenceInMonths(target, now);
  if (months > 0) return `${months} month${months > 1 ? "s" : ""}`;

  const days = differenceInDays(target, now);
  if (days > 0) return `${days} day${days > 1 ? "s" : ""}`;

  return "Less than a day";
}

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
  console.log(error instanceof Error ? error.message : "Error message");

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
    postInLinkedin: data.postInLinkedIn || false,
    linkedinCaption: data.linkedInCaption || "",
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
    latitude: data.latitude || "",
    longitude: data.longitude || "",
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
    templateId: data.templateId || "modern",
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
    certification: data.Certifications.map((cert) => ({
      title: cert.title || undefined,
      instituteName: cert.instituteName || undefined,
      completionDate: cert.completionDate?.toISOString().split("T")[0],
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

export function profileToResumeValue(data: JobSeekerProfile): ResumeValues {
  return {
    photo: data.image || undefined,
    fullName: data.name || undefined,
    jobTitle: data.JOB_SEEKER?.JobSeekerProfile?.designation || undefined,
    email: data.email || undefined,
    workExperiences: data.JOB_SEEKER?.JobSeekerProfile?.WorkExperience.map(
      (exp) => ({
        position: exp.position || undefined,
        company: exp.companyName || undefined,
        startDate: exp.startDate?.toISOString().split("T")[0],
        endDate: exp.endDate?.toISOString().split("T")[0],
        description: exp.description || undefined,
      })
    ),
    educations: data.JOB_SEEKER?.JobSeekerProfile?.Education.map((edu) => ({
      degree: edu.degreeTitle || undefined,
      school: edu.instituteName || undefined,
      startDate: edu.startDate?.toISOString().split("T")[0],
      endDate: edu.endDate?.toISOString().split("T")[0],
    })),
    certification: data.JOB_SEEKER?.JobSeekerProfile?.Certification.map(
      (cert) => ({
        title: cert.title || undefined,
        instituteName: cert.instituteName || undefined,
        completionDate: cert.completionDate?.toISOString().split("T")[0],
      })
    ),
    skills: data.JOB_SEEKER?.JobSeekerProfile?.skills || [],
    summary: data.JOB_SEEKER?.JobSeekerProfile?.bio || undefined,
  };
}

export function jobSeekerProfileStatus(
  jobSeekerProfile: JobSeekerProfileApplication
): { completed: boolean; message: string } {
  const { JOB_SEEKER } = jobSeekerProfile;
  if (!JOB_SEEKER) {
    return { completed: false, message: "Profile not found" };
  }
  if (
    JOB_SEEKER.createdResumes.length === 0 &&
    JOB_SEEKER.uploadedResumes.length === 0
  ) {
    return { completed: false, message: "Resume is missing" };
  }
  const { JobSeekerProfile: profile } = JOB_SEEKER;
  if (!profile) {
    return { completed: false, message: "Profile not found" };
  }
  if (!profile.skills || profile.skills.length === 0) {
    return { completed: false, message: "Skills are missing" };
  }
  if (!profile.WorkExperience || profile.WorkExperience.length === 0) {
    return { completed: false, message: "Work Experience is missing" };
  }
  if (!profile.Education || profile.Education.length === 0) {
    return { completed: false, message: "Education is missing" };
  }

  return { completed: true, message: "Profile is completed" };
}

export function isCreatedResume(resumeId: string): boolean {
  return resumeId.startsWith("c") && resumeId.length === 25;
}
export function parseLatLng(value: string | null) {
  if (value === null || value === undefined) return value;
  const num = Number(value);
  return isNaN(num) ? null : num;
}

const TECH_ICON_BASE_URL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const normalizeTechName = (tech: string) => {
  const key = tech.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");
  return mappings[key as keyof typeof mappings];
};
const checkIconExists = async (url: string) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok; // Returns true if the icon exists
  } catch {
    return false;
  }
};

export const getTechLogos = async (techArray: string[]) => {
  const logoURLs = techArray.map((tech) => {
    const normalized = normalizeTechName(tech);
    return {
      tech,
      url: `${TECH_ICON_BASE_URL}/${normalized}/${normalized}-original.svg`,
    };
  });

  const results = await Promise.all(
    logoURLs.map(async ({ tech, url }) => ({
      tech,
      url: (await checkIconExists(url)) ? url : "null",
    }))
  );

  return results;
};

export const refactorInterviewDateForChart = (
  mockInterviews: MockInterviewDataWithFeedback[]
) => {
  const refactoredData = mockInterviews.map((interview) => {
    const total = interview.MockInterviewFeedback.reduce(
      (sum, feedback) => sum + (feedback.totalScore ?? 0),
      0
    );
    const averageScore = total / interview.MockInterviewFeedback.length;

    return {
      name: interview.role,
      score: averageScore,
    };
  });
  return refactoredData;
};

export const formatDateRange = (currentValue: DateRangeValue) => {
  const { from, to } = currentValue.range;
  if (!from || !to) return "";
  return `${format(from, "MMM d, yyyy")} - ${format(to, "MMM d, yyyy")}`;
};
export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

type SubscriptionType = {
  name: string;
  price: string;
};

export const getSubscriptionValuedFromPriceId = (
  priceId: string
): SubscriptionType => {
  if (!priceId) {
    return {} as SubscriptionType;
  }
  if (priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY) {
    return {
      name: "Pro",
      price: "$9.99",
    };
  } else if (
    priceId === process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ELITE_MONTHLY
  ) {
    return {
      name: "Elite",
      price: "$19.99",
    };
  } else {
    return {} as SubscriptionType;
  }
};

export const LinkedInRedirectUri = `${process.env.NEXT_PUBLIC_BASE_URL}/api/callback/linkedin`;

export const JobVerseLogoUrl =
  "https://utfs.io/f/AxbCfMURBwL11wIuavQdKomzIhEBq659AJPs84VuLCUlgMRc";

export function jobSeekerProfileCompletionPercentage(
  jobSeekerProfile: JobSeekerProfileApplication
): { percentage: number; message: string } {
  const { JOB_SEEKER } = jobSeekerProfile;

  if (!JOB_SEEKER) {
    return { percentage: 0, message: "Profile not found" };
  }

  let score = 0;
  const totalSections = 5; // Updated count includes Certifications

  // Section 1: Resume
  if (
    JOB_SEEKER.createdResumes.length > 0 ||
    JOB_SEEKER.uploadedResumes.length > 0
  ) {
    score++;
  }

  const { JobSeekerProfile: profile } = JOB_SEEKER;
  if (!profile) {
    const percentage = Math.round((score / totalSections) * 100);
    return {
      percentage,
      message: `Only resume information is available. Completion: ${percentage}%`,
    };
  }

  // Section 2: Skills
  if (profile.skills && profile.skills.length > 0) {
    score++;
  }

  // Section 3: Work Experience
  if (profile.WorkExperience && profile.WorkExperience.length > 0) {
    score++;
  }

  // Section 4: Education
  if (profile.Education && profile.Education.length > 0) {
    score++;
  }

  // Section 5: Certifications
  if (profile.Certification && profile.Certification.length > 0) {
    score++;
  }

  const percentage = Math.round((score / totalSections) * 100);
  const message = `${percentage}% completed`;

  return { percentage, message };
}
