"use client";
import { LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { CompanyInclude } from "@/lib/prisma-types/Company";
import { useState } from "react";
import LeaveCompanyModal from "./LeaveCompanyModal";
import { Session } from "next-auth";

interface LeaveCompanyButtonProps {
  activeCompany: CompanyInclude;
  session: Session;
}

const LeaveCompanyButton = ({
  activeCompany,
  session,
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
          session={session}
          open={open}
          setOpen={setOpen}
          activeCompany={activeCompany}
        />
      )}
    </>
  );
};
export default LeaveCompanyButton;
