"use client";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { CompanyInclude } from "@/lib/prisma-types/Company";
import { useState } from "react";
import { ExtendedUser } from "@/next-auth";
import LeaveCompanyModal from "./LeaveCompanyModal";

interface LeaveCompanyButtonProps {
  activeCompany: CompanyInclude;
  user: ExtendedUser;
}

const LeaveCompanyButton = ({
  activeCompany,
  user,
}: LeaveCompanyButtonProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="w-full"
        variant="destructive"
      >
        <span>
          <LogOut />
        </span>
        <span>Leave Company</span>
      </Button>
      {open && (
        <LeaveCompanyModal
          user={user}
          open={open}
          setOpen={setOpen}
          activeCompany={activeCompany}
        />
      )}
    </>
  );
};
export default LeaveCompanyButton;
