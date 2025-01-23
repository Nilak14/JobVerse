"use client";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompanyInclude } from "@/lib/prisma-types/Company";
import { useState } from "react";
import DeleteCompanyModal from "@/components/Company/DeleteCompanyModal";
import { Session } from "next-auth";

interface DeleteCompanyButtonProps {
  activeCompany: CompanyInclude;
  session: Session;
}

const DeleteCompanyButton = ({
  activeCompany,
  session,
}: DeleteCompanyButtonProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        className="w-full"
        onClick={() => setOpen(true)}
        variant="destructive"
      >
        <span>
          <Trash />
        </span>
        <span>Delete Company</span>
      </Button>
      {open && (
        <DeleteCompanyModal
          session={session}
          open={open}
          setOpen={setOpen}
          activeCompany={activeCompany}
        />
      )}
    </>
  );
};
export default DeleteCompanyButton;
