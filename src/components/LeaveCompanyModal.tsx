import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-dailog";
import { CompanyInclude } from "@/lib/prisma-types/Company";
import { ExtendedUser } from "@/next-auth";
import { Button } from "./ui/button";
import { useAction } from "next-safe-action/hooks";
import { leaveCompany } from "@/actions/companies/leaveCompany";
import { toast } from "sonner";
import { Building } from "lucide-react";
import { useRouter } from "next/navigation";
import LoadingButton from "./ui/loading-button";

interface LeaveCompanyModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeCompany: CompanyInclude;
  user: ExtendedUser;
}

const LeaveCompanyModal = ({
  open,
  setOpen,
  activeCompany,
  user,
}: LeaveCompanyModalProps) => {
  const router = useRouter();
  //   const { execute, isExecuting } = useAction(leaveCompany, {
  //     onSuccess: ({ data }) => {
  //       setOpen(false);
  //       if (data?.success) {
  //         toast.success(data.message, {
  //           id: "leave-company",
  //           icon: <Building />,
  //         });
  //         router.refresh();
  //       } else {
  //         toast.error(data?.message || "Failed to leave the company", {
  //           id: "leave-company",
  //           icon: <Building />,
  //         });
  //       }
  //     },
  //     onError: () => {
  //       setOpen(false);
  //       toast.error("Failed to leave the company", {
  //         id: "leave-company",
  //         icon: <Building />,
  //       });
  //     },
  //   });
  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalContent
        // onInteractOutside={(e) => {
        //   isExecuting && e.preventDefault();
        // }}
        className="space-y-5 md:space-y-0"
      >
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>
            Are you sure you want to leave this Company ?
          </ResponsiveModalTitle>
        </ResponsiveModalHeader>
        <ResponsiveModalDescription>
          Leaving this company will remove all your data related to this
          company.
        </ResponsiveModalDescription>
        <div className="w-full flex justify-between">
          <Button
            // disabled={isExecuting}
            onClick={() => setOpen(false)}
            variant={"outline"}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={false}
            // loading={isExecuting}
            showIconOnly
            // disabled={isExecuting}
            // onClick={() => {
            //   execute({ companyId: activeCompany.id, userId: user.id! });
            // }}
            variant={"destructive"}
          >
            Leave
          </LoadingButton>
        </div>
        <ResponsiveModalFooter>
          <div className="text-center w-full">
            <p className="text-sm text-muted-foreground">
              You are leaving the{" "}
              <span className="font-bold">{activeCompany.name}</span>
            </p>
          </div>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

export default LeaveCompanyModal;
