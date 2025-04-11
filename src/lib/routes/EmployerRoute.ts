// Sidebar NavLinks for Employer

import {
  BriefcaseBusiness,
  Building,
  FileUser,
  FolderOutput,
  LayoutDashboard,
  List,
  Settings,
  UserCog,
  UsersRound,
  Video,
} from "lucide-react";
import { SidebarNavLinks } from "../types";

export const EmployerSideBarLinks: SidebarNavLinks[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/employer/dashboard",
  },
  {
    title: "Manage Company",
    icon: Building,
    url: "#",
    items: [
      {
        title: "Company Members",
        url: "/employer/company/members",
        icon: UsersRound,
      },
      {
        title: "Company Settings",
        url: "/employer/company/setting",
        icon: Settings,
      },
    ],
  },
  {
    title: "Job Studio",
    icon: BriefcaseBusiness,
    url: "#",
    items: [
      {
        title: "View Jobs",
        url: "/employer/job",
        icon: List,
      },
      {
        title: "View Applicants",
        url: "/employer/applicants",
        icon: FileUser,
      },
    ],
  },

  {
    title: "Design Studio",
    icon: Video,
    url: "/employer/design-studio",
    items: [
      {
        title: "Job Embedding",
        url: "/employer/embed-job",
        icon: FolderOutput,
        isPremium: true,
        subscriptionLevel: "PRO",
      },
    ],
  },
  {
    title: "Account Settings",
    icon: UserCog,
    url: "/employer/settings",
  },
];
