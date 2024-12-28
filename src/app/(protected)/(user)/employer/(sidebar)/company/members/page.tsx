import { companyEmployerColumns } from "@/columns/company-user-column";
import JVTable from "@/components/Global/JVTable";
import SidebarContainer from "@/components/Global/SidebarContainer";
import InviteNewMemberButton from "@/components/InviteNewMemberButton";
import { getCompanyEmployer } from "@/data-access/company/getCompanyEmployer";
import { CompanyEmployer } from "@/lib/prisma-types/Employers";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Members",
};

const CompanyMemberPage = async () => {
  // const data = await getData();
  const data: CompanyEmployer[] = await getCompanyEmployer();

  return (
    <SidebarContainer>
      <section className="flex flex-col w-full gap-10">
        <div className="w-full flex justify-end items-end">
          <InviteNewMemberButton />
        </div>
        <JVTable
          searchColumn={"name"}
          searchPlaceholder="Search User..."
          columns={companyEmployerColumns}
          data={data || []}
        />
      </section>
    </SidebarContainer>
  );
};
export default CompanyMemberPage;
