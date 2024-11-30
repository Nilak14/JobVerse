import { Briefcase, LayoutDashboard, Video, FileUser } from "lucide-react";
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
