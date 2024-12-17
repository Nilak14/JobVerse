import SidebarContainer from "@/components/Global/SidebarContainer";
import InviteNewMemberButton from "@/components/InviteNewMemberButton";

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
