// Sidebar NavLinks for JobSeeker

import { FileUser, LayoutDashboard, Video } from "lucide-react";
import { SidebarNavLinks } from "../types";

export const JobSeekerSideBarLinks: SidebarNavLinks[] = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/job-seeker/dashboard" },
  {
    title: "Design Studio",
    icon: Video,
    url: "/job-seeker/design-studio",
    items: [
      {
        title: "Create CV",
        url: "/job-seeker/design-studio/create-cv",
        icon: FileUser,
      },
    ],
  },
];
