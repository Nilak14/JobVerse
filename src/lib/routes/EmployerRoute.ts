// Sidebar NavLinks for Employer

import {
  Building,
  Globe,
  LayoutDashboard,
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
