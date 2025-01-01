"use client";
import { UserMinus } from "lucide-react";
import { Button } from "./ui/button";
import { CompanyInclude } from "@/lib/prisma-types/Company";
import { useState } from "react";
import RemoveCompanyMemberModal from "./RemoveCompanyMemberModal";

interface RemoveCompanyMembersButtonProps {
  activeCompany: CompanyInclude;
}

const RemoveCompanyMembersButton = ({
  activeCompany,
}: RemoveCompanyMembersButtonProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="secondary"
        className="text-destructive font-semibold w-full"
      >
        <span>
          <UserMinus />
        </span>
        <span>Remove Members</span>
      </Button>
      {open && (
        <RemoveCompanyMemberModal
          open={open}
          setOpen={setOpen}
          activeCompany={activeCompany}
        />
      )}
    </>
  );
};
export default RemoveCompanyMembersButton;
