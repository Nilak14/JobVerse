// Sidebar NavLinks for JobSeeker

import {
  BriefcaseBusiness,
  Building2,
  FileChartLine,
  FileUser,
  Heart,
  LayoutDashboard,
  ScanSearch,
  Settings,
  UserCheck,
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
      {
        title: "Applied Jobs",
        url: "/job-seeker/applied-jobs",
        icon: Heart,
      },
    ],
  },
  {
    title: "Career Coach",
    icon: UserCheck,
    url: "/",
    items: [
      {
        title: "Mock Interview",
        url: "/job-seeker/career-coach/mock-interview",
        icon: FileChartLine,
        isPremium: true,
        subscriptionLevel: "ELITE",
      },
    ],
  },
  {
    title: "Design Studio",
    icon: Video,
    url: "/job-seeker/design-studio",
    items: [
      {
        title: "Resume Studio",
        url: "/job-seeker/design-studio/resume",
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
    ],
  },
];
