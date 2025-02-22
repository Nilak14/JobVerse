import { ExtendedUser } from "@/next-auth";
import { JobSchemaType } from "@/schema/CreateJobSchema";
import { LucideIcon } from "lucide-react";
import { JobSeekerProfile } from "./prisma-types/JobSeekerProfile";

export interface LandingPageNavLinks {
  name: string;
  href: string;
}

export interface SidebarNavLinks {
  title: string;
  url: string;
  icon?: LucideIcon;
  items?: {
    title: string;
    url: string;
    icon?: LucideIcon;
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
