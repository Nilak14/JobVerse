"use client";

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
import { AdminSideBarLinks } from "@/lib/routes/AdminRoute";

const AdminSidebar = ({ user }: { user: ExtendedUser }) => {
  const sidebarLinks = AdminSideBarLinks;
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarTop userName={user.name as string} isLoading={!user} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMainNav
          subscriptionLevel="ELITE"
          type="admin"
          items={sidebarLinks}
        />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser user={user} isLoading={!user} />
      </SidebarFooter>
    </Sidebar>
  );
};
export default AdminSidebar;
