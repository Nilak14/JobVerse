"use client";

import { EmployerSideBarLinks } from "@/lib/data";
import { ExtendedUser } from "@/next-auth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../ui/sidebar";
import { SidebarTop } from "./SidebarTop";
import { SidebarMainNav } from "./SidebarMainNav";
import { SidebarUser } from "./SidebarUser";

const EmployerSidebar = ({ user }: { user: ExtendedUser }) => {
  const sidebarLinks = EmployerSideBarLinks;
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarTop
          userName={user.name as string}
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
    </Sidebar>
  );
};
export default EmployerSidebar;
