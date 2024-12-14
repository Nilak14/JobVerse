import { switchCompany } from "@/actions/SwitchCompany";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-dailog";
import { EmployerCompanies } from "@/lib/prismaTypes";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import LoadingButton from "./ui/loading-button";

interface CompanySwitchDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  company: EmployerCompanies["companies"][0];
  setActiveCompany: Dispatch<
    SetStateAction<{
      id: string;
      logoUrl: string | null;
      name: string;
      description: string | null;
      website: string | null;
    }>
  >;
}
const CompanySwitchDialog = ({
  company,
  open,
  setOpen,
  setActiveCompany,
}: CompanySwitchDialogProps) => {
  const router = useRouter();
  const { execute, status } = useAction(switchCompany, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.success("Company switched successfully", {
          id: "switch-company",
        });
        setActiveCompany(company);
        router.refresh();
        setOpen(false);
      } else if (data?.error) {
        toast.error(data.error, { id: "switch-company" });
      }
    },
    onError: () => {
      toast.error("Error switching company", { id: "switch-company" });
    },
  });
  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Switch Company?</ResponsiveModalTitle>
          <ResponsiveModalDescription className="sr-only">
            Are you sure you want to switch to {company.name}
          </ResponsiveModalDescription>
          <div>
            <h3 className=" text-sm text-pretty mt-3">
              Are you sure you want to switch your company to{" "}
              <strong>{company.name} ? </strong>
            </h3>
          </div>
          <ResponsiveModalFooter>
            <div className="flex justify-between w-full mt-5">
              <Button
                disabled={status === "executing"}
                onClick={() => setOpen(false)}
                variant={"secondary"}
              >
                Cancel
              </Button>
              <LoadingButton
                onClick={() => execute({ companyId: company.id })}
                showIconOnly
                loading={status === "executing"}
              >
                Switch
              </LoadingButton>
            </div>
          </ResponsiveModalFooter>
        </ResponsiveModalHeader>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};
export default CompanySwitchDialog;
