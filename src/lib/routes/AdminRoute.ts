// Sidebar NavLinks for Admin

import { BriefcaseBusiness, LayoutDashboard, List } from "lucide-react";
import { SidebarNavLinks } from "../types";

export const AdminSideBarLinks: SidebarNavLinks[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/admin/dashboard",
  },
  {
    title: "Job Studio",
    icon: BriefcaseBusiness,
    url: "",
    items: [
      {
        title: "All Jobs",
        url: "/admin/all-jobs",
        icon: List,
      },
    ],
  },
];
