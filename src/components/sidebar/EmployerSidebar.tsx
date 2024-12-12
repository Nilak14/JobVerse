"use client";

import { EmployerSideBarLinks } from "@/lib/data";
import { ExtendedUser } from "@/next-auth";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "../ui/sidebar";
import { SidebarMainNav } from "./SidebarMainNav";
import { SidebarUser } from "./SidebarUser";
import { CompanySwitcher } from "./CompanySwitcher";
import { useQueryAllCompanies } from "@/hooks/query-hooks/getEmployeeCompany";
import { EmployerCompanies } from "@/lib/prismaTypes";
import { Skeleton } from "../ui/skeleton";

const EmployerSidebar = ({
  user,
  activeCompanyId,
}: {
  user: ExtendedUser;
  activeCompanyId?: string | null;
}) => {
  const sidebarLinks = EmployerSideBarLinks;
  const { data, isLoading } = useQueryAllCompanies();
  const companies: EmployerCompanies["companies"] = data?.data.companies;
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {isLoading ? (
          <Skeleton className="w-full h-12 flex items-center"></Skeleton>
        ) : (
          <CompanySwitcher
            activeCompanyId={activeCompanyId}
            user={user}
            companies={companies}
          />
        )}
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
