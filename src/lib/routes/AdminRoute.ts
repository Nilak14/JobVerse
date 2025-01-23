// Sidebar NavLinks for Admin

import { Globe, LayoutDashboard, Video } from "lucide-react";
import { SidebarNavLinks } from "../types";

export const AdminSideBarLinks: SidebarNavLinks[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/admin/dashboard",
  },
  {
    title: "Test",
    icon: Video,
    url: "/admin/test",
    items: [
      {
        title: "Test Route",
        url: "/admin/test",
        icon: Globe,
      },
    ],
  },
];
