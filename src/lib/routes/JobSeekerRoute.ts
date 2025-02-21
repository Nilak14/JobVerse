// Sidebar NavLinks for JobSeeker

import {
  BriefcaseBusiness,
  FileUser,
  Heart,
  LayoutDashboard,
  ScanSearch,
  Settings,
  UserCog,
  Video,
} from "lucide-react";
import { SidebarNavLinks } from "../types";

export const JobSeekerSideBarLinks: SidebarNavLinks[] = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/job-seeker/dashboard" },
  {
    title: "Jobs",
    icon: BriefcaseBusiness,
    url: "",
    items: [
      {
        title: "Browse Jobs",
        url: "/job-seeker/browse/jobs",
        icon: ScanSearch,
      },
      {
        title: "Saved Jobs",
        url: "/job-seeker/saved-jobs",
        icon: Heart,
      },
    ],
  },
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
  {
    title: "Settings",
    icon: Settings,
    url: "/job-seeker/settings",
    items: [
      {
        title: "Account Settings",
        url: "/job-seeker/settings/account-settings",
        icon: UserCog,
      },
      {
        title: "Test",
        url: "/job-seeker/settings/test",
        icon: UserCog,
      },
    ],
  },
];
