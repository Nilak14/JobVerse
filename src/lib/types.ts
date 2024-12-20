import { ExtendedUser } from "@/next-auth";
import { LucideIcon } from "lucide-react";

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
  user: ExtendedUser;
  activeCompanyId?: string | null;
}
