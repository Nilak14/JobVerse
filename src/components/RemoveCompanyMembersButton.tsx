"use client";
import { UserMinus } from "lucide-react";
import { Button } from "./ui/button";
import { CompanyInclude } from "@/lib/prisma-types/Company";
import { useState } from "react";
import RemoveCompanyMemberModal from "./RemoveCompanyMemberModal";
import { Session } from "next-auth";

interface RemoveCompanyMembersButtonProps {
  activeCompany: CompanyInclude;
  session: Session;
}

const RemoveCompanyMembersButton = ({
  activeCompany,
  session,
}: RemoveCompanyMembersButtonProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        className="w-full"
        onClick={() => setOpen(true)}
        variant="destructive"
      >
        <span>
          <UserMinus />
        </span>
        <span>Remove Members</span>
      </Button>
      {open && (
        <RemoveCompanyMemberModal
          session={session}
          open={open}
          setOpen={setOpen}
          activeCompany={activeCompany}
        />
      )}
    </>
  );
};
export default RemoveCompanyMembersButton;
