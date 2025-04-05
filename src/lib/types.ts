import { ExtendedUser } from "@/next-auth";
import { JobSchemaType } from "@/schema/CreateJobSchema";
import { LucideIcon } from "lucide-react";
import { JobSeekerProfile } from "./prisma-types/JobSeekerProfile";
import { ResumeValues } from "@/schema/ResumeEditorSchema";

export interface LandingPageNavLinks {
  name: string;
  href: string;
}

export interface SidebarNavLinks {
  title: string;
  url: string;
  icon?: LucideIcon;
  isPremium?: boolean;
  subscriptionLevel?: "FREE" | "PRO" | "ELITE";
  items?: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isPremium?: boolean;
    subscriptionLevel?: "FREE" | "PRO" | "ELITE";
  }[];
}

export interface UserNavProps {
  hasSidebar?: boolean;
  user: ExtendedUser | null;
  activeCompanyId?: string | null;
}

export interface JobEditorFormProps {
  jobData: JobSchemaType;
  setJobData: (data: JobSchemaType) => void;
  currentStep: string;
}

export interface SaveJobInfo {
  isSavedByUser: boolean;
}

export type SaveJobResponse = {
  success: boolean;
  message: string;
  data?: {
    data: SaveJobInfo;
  };
};

export type JobSeekerProfileComponentProps = {
  profile: JobSeekerProfile;
};

export interface ResumeEditorFormProps {
  resumeData: ResumeValues;
  setResumeData: (data: ResumeValues) => void;
}

export interface ResumeTemplateProps {
  resumeData: ResumeValues;
}
export interface WidgetConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  borderRadius: number;
  showLogo: boolean;
  showApplyButton: boolean;
  note: string;
  showBranding: boolean;
  containerId: string;
}

export enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  ENDED = "ENDED",
}

export interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}
