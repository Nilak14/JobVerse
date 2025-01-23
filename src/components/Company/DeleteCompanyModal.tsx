import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-dailog";
import { Input } from "@/components/ui/input";
import { CompanyInclude } from "@/lib/prisma-types/Company";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { useAction } from "next-safe-action/hooks";
import { deleteCompany } from "@/actions/companies/deleteCompany";
import { toast } from "sonner";
import { Building } from "lucide-react";
import { useRouter } from "next/navigation";
import LoadingButton from "@/components/ui/loading-button";

interface DeleteCompanyModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeCompany: CompanyInclude;
  session: Session;
}

const DeleteCompanyModal = ({
  open,
  setOpen,
  activeCompany,
  session,
}: DeleteCompanyModalProps) => {
  const [makeButtonDisabled, setMakeButtonDisabled] = useState(true);
  const [value, setValue] = useState("");
  const router = useRouter();
  const { execute, isExecuting } = useAction(deleteCompany, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        setOpen(false);
        toast.success(data.message, {
          id: "delete-company",
          icon: <Building />,
        });

        router.refresh();
      } else {
        toast.error(data?.message, {
          id: "delete-company",
          icon: <Building />,
        });
      }
    },
    onError: () => {
      toast.error("Failed to delete the company", {
        id: "delete-company",
        icon: <Building />,
      });
    },
  });

  useEffect(() => {
    if (value === `Delete ${activeCompany.name}`) {
      setMakeButtonDisabled(false);
    } else {
      setMakeButtonDisabled(true);
    }
  }, [value]);

  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalContent
        onInteractOutside={(e) => {
          isExecuting && e.preventDefault();
        }}
        className="space-y-5 md:space-y-0"
      >
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
          {makeButtonDisabled ? (
            <Button
              className="w-full"
              variant={"destructive"}
              disabled={makeButtonDisabled}
            >
              Delete This Company
            </Button>
          ) : (
            <LoadingButton
              type="submit"
              loading={isExecuting}
              onClick={() =>
                execute({
                  companyId: activeCompany.id,
                  employerId: session.employerId!,
                })
              }
              className="w-full"
              variant={"destructive"}
            >
              Delete This Company
            </LoadingButton>
          )}
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

export default DeleteCompanyModal;
