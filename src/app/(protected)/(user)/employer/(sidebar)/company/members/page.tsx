import { companyEmployerColumns } from "@/columns/company-user-column";
import JVTableClient from "@/components/Global/JVTableClient";
import SidebarContainer from "@/components/Global/SidebarContainer";
import InviteNewMemberButton from "@/components/InviteNewMemberButton";
import { getCompanyMembers } from "@/data-access/company/getCompanyMembers";
import { CompanyMemberType } from "@/lib/prisma-types/CompanyMember";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Members",
  description: "This page shows all the members who are part of your company",
};

const CompanyMemberPage = async () => {
  const data: CompanyMemberType = await getCompanyMembers();

  return (
    <SidebarContainer>
      <section className="flex flex-col w-full gap-10">
        <div className="w-full flex justify-end items-end">
          <InviteNewMemberButton />
        </div>
        <JVTableClient
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
