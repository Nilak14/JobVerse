"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Building, UserX } from "lucide-react";
import { useState } from "react";
import { CompanyInclude } from "@/lib/prisma-types/Company";
import { useAction } from "next-safe-action/hooks";
import { leaveCompany } from "@/actions/companies/leaveCompany";
import { toast } from "sonner";
import LoadingButton from "@/components/ui/loading-button";
import { useRouter } from "next/navigation";

interface RemoveCompanyMemberPopoverProps {
  member: CompanyInclude["members"][0];
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  activeCompany: CompanyInclude;
}

const RemoveCompanyMemberPopover = ({
  member,
  setDialogOpen,
  setLoading,
  activeCompany,
}: RemoveCompanyMemberPopoverProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { execute, isExecuting } = useAction(leaveCompany, {
    onSuccess: ({ data }) => {
      if (data?.success) {
        setDialogOpen(false);
        toast.success(`${member.employer.user.name} removed successfully`, {
          id: "remove-company",
          icon: <Building />,
        });
        router.refresh();
        setLoading(false);
      } else {
        toast.error(
          `Failed to remove ${member.employer.user.name} from the company`,
          {
            id: "remove-company",
            icon: <Building />,
          }
        );
        setLoading(false);
      }
    },
    onError: () => {
      toast.error("Failed to leave the user from the company", {
        id: "remove-company",
        icon: <Building />,
      });
      setLoading(false);
    },
    onExecute: () => {
      setLoading(true);
    },
  });
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setOpen(true)}
          className="group"
          variant={"secondary"}
        >
          <UserX />
          <span className="hidden md:block">Remove</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        onInteractOutside={(e) => {
          isExecuting && e.preventDefault();
        }}
      >
        <div className="space-y-5">
          <h3 className="text-lg">Remove Member</h3>
          <p className="text-muted-foreground">
            Are you sure you want to remove {member.employer.user.name} ?
          </p>
          <div className="flex justify-between space-x-3">
            <Button
              disabled={isExecuting}
              onClick={() => setOpen(false)}
              variant="secondary"
            >
              Cancel
            </Button>
            <LoadingButton
              onClick={() => {
                execute({
                  employerId: member.employer.id,
                  isAdminAction: true,
                });
              }}
              loading={isExecuting}
              showIconOnly
              variant="destructive"
            >
              Remove
            </LoadingButton>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default RemoveCompanyMemberPopover;
