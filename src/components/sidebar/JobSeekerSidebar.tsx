"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SidebarTop } from "./SidebarTop";
import { SidebarMainNav } from "./SidebarMainNav";
import { SidebarUser } from "./SidebarUser";
import { JobSeekerSideBarLinks } from "@/lib/data";
import { ExtendedUser } from "@/next-auth";

export default function JobSeekerSidebar({ user }: { user: ExtendedUser }) {
  const sidebarLinks = JobSeekerSideBarLinks;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarTop
          userName={user?.name as string}
          isLoading={!user}
          userSubType="Pro"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMainNav items={sidebarLinks} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser user={user} isLoading={!user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
