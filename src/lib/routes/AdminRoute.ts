// Sidebar NavLinks for Admin

import {
  BriefcaseBusiness,
  Building,
  Cog,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";
import { SidebarNavLinks } from "../types";

export const AdminSideBarLinks: SidebarNavLinks[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/admin/dashboard",
  },
  {
    title: "All Users",
    icon: Users,
    url: "/admin/all-users",
  },
  {
    title: "All Jobs",
    icon: BriefcaseBusiness,
    url: "/admin/all-jobs",
  },
  {
    title: "All Company",
    icon: Building,
    url: "/admin/all-company",
  },
  {
    title: "Settings",
    icon: Settings,
    url: "/admin/settings",
  },
];
