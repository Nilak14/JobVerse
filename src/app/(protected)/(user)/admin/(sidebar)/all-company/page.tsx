import { AllCompanyColumn } from "@/columns/all-company-column";
import AdminAllCompanyTable from "@/components/Table/AdminCompanyTable";
import BoxReveal from "@/components/ui/box-reveal";
import { getAllCompany } from "@/data-access/company/getAllCompany";
import { Suspense } from "react";

export const metadata = {
  title: "All Company",
  description: "All Company",
};
const AllCompany = () => {
  return (
    <section className="space-y-10">
      <BoxReveal>
        <div className="space-y-3">
          <h1 className=" text-xl md:text-2xl font-semibold tracking-tighter">
            All Companies
          </h1>
          <p className="text-sm text-muted-foreground  tracking-wide">
            All the companies are listed here. You can manage them from here.
          </p>
        </div>
      </BoxReveal>
      <Suspense fallback={<div>Loading...</div>}>
        <AllCompanyDataLoader />
      </Suspense>
    </section>
  );
};
export default AllCompany;

const AllCompanyDataLoader = async () => {
  const users = await getAllCompany();

  return (
    <>
      <AdminAllCompanyTable
        showSerialNumber
        showPagination
        columns={AllCompanyColumn}
        data={users}
      />
    </>
  );
};
