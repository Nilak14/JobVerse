"use client";
import { useActiveCompany } from "@/store/useActiveCompany";
import Container from "../Global/Container";
import Notification from "../Global/Notification";
import { UserNavProps } from "@/lib/types";
import { useQueryAllCompanies } from "@/hooks/query-hooks/getEmployeeCompany";
import { useEffect } from "react";
import { EmployerCompany } from "@/lib/prisma-types/Employers";
import { useQueryJobCategories } from "@/hooks/query-hooks/getAllJobCategories";
import { useJobCategory } from "@/store/useJobCategory";
import { NavUser } from "./NavUser";
import NavLogo from "../Global/NavLogo";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";

const EmployerNav = ({
  hasSidebar = false,
  user,
  activeCompanyId,
}: UserNavProps) => {
  const { setActiveCompany } = useActiveCompany();
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
  if (!user) return null;
  return (
    <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 bg-background z-50 ">
      <div className="flex flex-1 items-center justify-center gap-2 h-16 px-3  border-b border-muted-foreground/40">
        {hasSidebar && (
          <>
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </>
        )}
        <Container className=" w-full flex justify-between items-center gap-10 ">
          <div>{hasSidebar || <NavLogo />}</div>
          <div className="flex gap-10">
            <Notification />
            {hasSidebar || <div>{user && <NavUser user={user} />}</div>}
          </div>
        </Container>
      </div>
    </header>
  );
};
export default EmployerNav;
