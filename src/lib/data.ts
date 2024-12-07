import {
  Briefcase,
  LayoutDashboard,
  Video,
  FileUser,
  Globe,
} from "lucide-react";
import { LandingPageNavLinks, SidebarNavLinks } from "./types";

// NavLinks for landing page
export const NavLinks: LandingPageNavLinks[] = [
  {
    name: "Home",
    href: "#",
  },
  { name: "Pricing", href: "#" },

  {
    name: "About",
    href: "#",
  },

  {
    name: "Contact",
    href: "#",
  },
];

// Sidebar NavLinks for JobSeeker

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

// Sidebar NavLinks for Company

export const CompanySideBarLinks: SidebarNavLinks[] = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    url: "/company/dashboard",
  },
  {
    title: "Design Studio",
    icon: Video,
    url: "/company/design-studio",
    items: [
      {
        title: "Create Website",
        url: "/company/design-studio/create-website",
        icon: Globe,
      },
    ],
  },
];

// Sidebar NavLinks for Admin

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
