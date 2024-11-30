import { LucideIcon } from "lucide-react";

export interface LandingPageNavLinks {
  name: string;
  href: string;
}

export interface SidebarNavLinks {
  title: string;
  url: string;
  icon?: LucideIcon;
  items?: {
    title: string;
    url: string;
    icon?: LucideIcon;
  }[];
}
