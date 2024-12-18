import SidebarContainer from "@/components/Global/SidebarContainer";
import InviteNewMemberButton from "@/components/InviteNewMemberButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Members",
};

const CompanyMemberPage = () => {
  return (
    <SidebarContainer>
      <div className="w-full flex justify-end items-end">
        <InviteNewMemberButton />
      </div>
    </SidebarContainer>
  );
};
export default CompanyMemberPage;
