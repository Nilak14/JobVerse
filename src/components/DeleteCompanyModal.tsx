import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-dailog";
import { Input } from "./ui/input";
import { CompanyInclude } from "@/lib/prisma-types/Company";
import { use, useEffect, useState } from "react";
import { Button } from "./ui/button";

interface DeleteCompanyModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeCompany: CompanyInclude;
}

const DeleteCompanyModal = ({
  open,
  setOpen,
  activeCompany,
}: DeleteCompanyModalProps) => {
  const [makeButtonDisabled, setMakeButtonDisabled] = useState(true);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value === `Delete ${activeCompany.name}`) {
      setMakeButtonDisabled(false);
    } else {
      setMakeButtonDisabled(true);
    }
  }, [value]);

  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalContent className="space-y-5 md:space-y-0">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>
            Are you sure, You want to Delete {activeCompany.name} ?
          </ResponsiveModalTitle>
        </ResponsiveModalHeader>
        <ResponsiveModalDescription className="sr-only">
          Remove Members From {activeCompany.name}
        </ResponsiveModalDescription>
        <div className="flex items-center flex-col">
          <p className="text-sm  mb-2 self-start">
            To Confirm, type "Delete {activeCompany.name}" in the box below
          </p>
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
          />
        </div>
        <ResponsiveModalFooter>
          <Button
            className="w-full"
            variant={"destructive"}
            disabled={makeButtonDisabled}
          >
            Delete This Company
          </Button>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

export default DeleteCompanyModal;
