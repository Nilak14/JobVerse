"use client";

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
import { EmployerCompany } from "@/lib/prisma-types/Employers";
import { Skeleton } from "../ui/skeleton";
import { useRouter } from "next/navigation";
import { EmployerSideBarLinks } from "@/lib/routes/EmployerRoute";
import { useCompanySubscriptionLevel } from "@/context/CompanySubscriptionLevelProvider";

const EmployerSidebar = ({
  user,
  activeCompanyId,
}: {
  user: ExtendedUser;
  activeCompanyId?: string | null;
}) => {
  const sidebarLinks = EmployerSideBarLinks;
  const { data, isLoading } = useQueryAllCompanies();
  const router = useRouter();
  const companies: EmployerCompany[] = data?.data.companies;
  const companySubscription = useCompanySubscriptionLevel();
  if (!isLoading && companies.length === 0) {
    router.push("/onboarding/employer");
  }

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
            userSubType={companySubscription}
          />
        )}
      </SidebarHeader>
      <SidebarContent>
        <SidebarMainNav
          user={user}
          type="employer"
          subscriptionLevel={companySubscription}
          items={sidebarLinks}
        />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser user={user} isLoading={!user} />
      </SidebarFooter>
    </Sidebar>
  );
};
export default EmployerSidebar;
