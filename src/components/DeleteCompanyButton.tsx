"use client";
import { Trash, UserMinus } from "lucide-react";
import { Button } from "./ui/button";
import { CompanyInclude } from "@/lib/prisma-types/Company";
import { useState } from "react";
import DeleteCompanyModal from "./DeleteCompanyModal";

interface DeleteCompanyButtonProps {
  activeCompany: CompanyInclude;
}

const DeleteCompanyButton = ({ activeCompany }: DeleteCompanyButtonProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="secondary"
        className="text-destructive font-semibold w-full"
      >
        <span>
          <Trash />
        </span>
        <span>Delete Company</span>
      </Button>
      {open && (
        <DeleteCompanyModal
          open={open}
          setOpen={setOpen}
          activeCompany={activeCompany}
        />
      )}
    </>
  );
};
export default DeleteCompanyButton;
