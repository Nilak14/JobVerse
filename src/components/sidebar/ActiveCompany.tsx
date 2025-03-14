"use client";
import { useQueryJobCategories } from "@/hooks/query-hooks/getAllJobCategories";
import { useQueryAllCompanies } from "@/hooks/query-hooks/getEmployeeCompany";
import { EmployerCompany } from "@/lib/prisma-types/Employers";
import { useActiveCompany } from "@/store/useActiveCompany";
import { useJobCategory } from "@/store/useJobCategory";
import { useEffect } from "react";
interface ActiveCompanyProps {
  activeCompanyId: string | null | undefined;
}
const ActiveCompany = ({ activeCompanyId }: ActiveCompanyProps) => {
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
  return <></>;
};
export default ActiveCompany;
