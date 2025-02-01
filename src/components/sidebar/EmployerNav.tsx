"use client";
import { useActiveCompany } from "@/store/useActiveCompany";
import Container from "../Global/Container";
import Notification from "../Global/Notification";
import { Logo } from "../LandingPage/NavBar";
import { SidebarUser } from "./SidebarUser";
import { UserNavProps } from "@/lib/types";
import { useQueryAllCompanies } from "@/hooks/query-hooks/getEmployeeCompany";
import { useEffect } from "react";
import { EmployerCompany } from "@/lib/prisma-types/Employers";
import { useQueryJobCategories } from "@/hooks/query-hooks/getAllJobCategories";
import { useJobCategory } from "@/store/useJobCategory";

const EmployerNav = ({
  hasSidebar = false,
  user,
  activeCompanyId,
}: UserNavProps) => {
  const { setActiveCompany, activeCompany } = useActiveCompany();
  const { data, isLoading } = useQueryAllCompanies();

  const { data: category, isLoading: categoryLoading } =
    useQueryJobCategories();
  const { setCategory, setIsLoading } = useJobCategory();
  useEffect(() => {
    setCategory(category?.data.category);
    setIsLoading(categoryLoading);
  }, [category, categoryLoading]);

  //todo: add one client component to this component and fetch companies and set active company there. make this nav server component as much as possible

  useEffect(() => {
    if (activeCompanyId) {
      if (data) {
        const activeCompany = data.data.companies.find(
          (company: EmployerCompany) => company.id === activeCompanyId
        );

        setActiveCompany(activeCompany);
      }
    } else {
      setActiveCompany(data?.data.companies[0]);
    }
  }, [data, isLoading, activeCompanyId]);

  return (
    <header>
      <Container className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-sidebar shadow-sm shadow-muted-foreground/30 ">
        <section className="flex-1  h-full flex items-center">
          {hasSidebar || (
            <Logo showText={false} fill="#e9590c" height="40" width="40" />
          )}
        </section>
        <section className="flex-1  h-full flex items-center justify-end gap-10 ">
          <div className="">
            <Notification />
          </div>
          {hasSidebar || (
            <div>
              <SidebarUser isNav user={user} isLoading={!user} />
            </div>
          )}
        </section>
      </Container>
    </header>
  );
};
export default EmployerNav;
