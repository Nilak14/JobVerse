import { switchCompany } from "@/actions/companies/SwitchCompany";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-dailog";
import { EmployerCompany } from "@/lib/prisma-types/Employers";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import LoadingButton from "../ui/loading-button";
import { useActiveCompany } from "@/store/useActiveCompany";
import { useQueryClient } from "react-query";

interface CompanySwitchDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  company: EmployerCompany;
  setActiveCompany: Dispatch<SetStateAction<EmployerCompany>>;
}
const CompanySwitchDialog = ({
  company,
  open,
  setOpen,
  setActiveCompany,
}: CompanySwitchDialogProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setActiveCompany: setActiveCompanyStore } = useActiveCompany();
  const { execute, status } = useAction(switchCompany, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        toast.success("Company switched successfully", {
          id: "switch-company",
        });
        setActiveCompany(company);
        setActiveCompanyStore(company);
        router.refresh();
        // window.location.reload();
        setOpen(false);
      } else {
        toast.error(data?.message, { id: "switch-company" });
        queryClient.invalidateQueries({ queryKey: ["companies"] });
        router.refresh();
        setOpen(false);
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
