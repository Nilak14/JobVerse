// Sidebar NavLinks for Employer

import {
  BriefcaseBusiness,
  BriefcaseMedical,
  Building,
  FileUser,
  Globe,
  LayoutDashboard,
  List,
  Settings,
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
        title: "Create Website",
        url: "/employer/design-studio/create-website",
        icon: Globe,
      },
    ],
  },
];
