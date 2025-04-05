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
import { ExtendedUser } from "@/next-auth";
import { JobSeekerSideBarLinks } from "@/lib/routes/JobSeekerRoute";
import { useJobSeekerSubscriptionLevel } from "@/context/JobSeekerSubscriptionLevelProvider";

export default function JobSeekerSidebar({ user }: { user: ExtendedUser }) {
  const sidebarLinks = JobSeekerSideBarLinks;
  const subscriptionLevel = useJobSeekerSubscriptionLevel();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarTop
          userName={user?.name as string}
          isLoading={!user}
          userSubType={subscriptionLevel}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMainNav
          type="job-seeker"
          subscriptionLevel={subscriptionLevel}
          items={sidebarLinks}
        />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser user={user} isLoading={!user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
