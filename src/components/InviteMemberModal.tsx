import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "@/components/ui/responsive-dailog";
import { useActiveCompany } from "@/store/useActiveCompany";
import { Input } from "./ui/input";
import { Search, Send } from "lucide-react";
import LinkButtonAnimated from "./ui/animated-button-link";
import { useDebounce } from "@/hooks/custom-hooks/use-debounce";
import { useState } from "react";
import { useQueryEmployeeSearch } from "@/hooks/query-hooks/useQueryEmployeeSearch";
import UserAvatar from "./Global/Useravatar";
import LoadingButton from "./ui/loading-button";
import { EmployerSearch } from "@/lib/prisma-types/Employers";
import EmployerSearchSkeleton from "./skeletons/EmployerSearchSkeleton";
import { getClientSession } from "@/store/getClientSession";
import { useAction } from "next-safe-action/hooks";
import { createInvitation } from "@/actions/invitations/createCompanyInvitation";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { AnimatedList } from "./ui/animated-list";

interface InviteMemberModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InviteMemberModal = ({ open, setOpen }: InviteMemberModalProps) => {
  const { activeCompany } = useActiveCompany();
  const { session, status } = getClientSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );
  const debouncedSearchValue = useDebounce(searchQuery);

  const {
    data: searchedEmployee,
    isLoading,
    refetch,
  } = useQueryEmployeeSearch(debouncedSearchValue.trim(), activeCompany.id);

  const { execute } = useAction(createInvitation, {
    onSuccess: ({ data, input }) => {
      // Clear loading state for this specific user
      setLoadingStates((prev) => ({
        ...prev,
        [input.inviteeId]: false,
      }));

      if (data?.success) {
        toast.success(data.message);
        refetch();
      } else {
        toast.error(data?.message);
      }
    },
  });

  const handleInvite = async (employerId: string) => {
    if (status === "loading") return;

    // Set loading state for this specific user
    setLoadingStates((prev) => ({
      ...prev,
      [employerId]: true,
    }));

    execute({
      companyId: activeCompany.id,
      inviteeId: employerId,
      userId: session?.user.id!,
    });
  };

  return (
    <ResponsiveModal open={open} onOpenChange={setOpen}>
      <ResponsiveModalContent className="space-y-5 md:space-y-0">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>
            Invite New Members to Company
          </ResponsiveModalTitle>
        </ResponsiveModalHeader>
        <ResponsiveModalDescription className="sr-only">
          Invite New Members to Company
        </ResponsiveModalDescription>
        <div className="flex items-center flex-col">
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Employer Name"
            endIcon={Search}
            type="text"
          />
          <p className="text-xs text-muted-foreground mt-2 self-start">
            Search By Name or Email
          </p>
        </div>
        <section className="space-y-3 max-h-[246px] over-x-hidden overflow-y-auto">
          {!isLoading &&
            searchedEmployee?.data.employers &&
            searchedEmployee.data.employers.length >= 1 &&
            searchedEmployee.data.employers.map((employee: EmployerSearch) => {
              const employerId = employee.EMPLOYER?.id!;
              return (
                <AnimatedList key={employee.id} delay={0.5}>
                  <div
                    className="border-input border w-full p-4 rounded-lg flex items-center justify-between"
                    key={employee.id}
                  >
                    <div className="flex items-center gap-5 w-full truncate ">
                      <UserAvatar
                        imageUrl={employee.image || ""}
                        userName={employee.name!}
                      />
                      <div className="max-w-[250px] ">
                        <p className="truncate">{employee.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {employee.email}
                        </p>
                      </div>
                    </div>
                    <LoadingButton
                      onClick={() => handleInvite(employerId)}
                      showIconOnly
                      className="group"
                      variant={"secondary"}
                      loading={loadingStates[employerId] || false}
                    >
                      <Send className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-all duration-200" />
                      <span className="hidden md:block">Invite</span>
                    </LoadingButton>
                  </div>
                </AnimatedList>
              );
            })}
          {!isLoading &&
            debouncedSearchValue &&
            searchedEmployee?.data.employers?.length === 0 && (
              <motion.p
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                className="text-muted-foreground text-sm text-center"
              >
                No results found for "{debouncedSearchValue}"
              </motion.p>
            )}
          {isLoading && (
            <AnimatedList delay={0.5}>
              <EmployerSearchSkeleton />
              <EmployerSearchSkeleton />
            </AnimatedList>
          )}
        </section>
        <ResponsiveModalFooter>
          <div className="text-center w-full space-y-5 ">
            <LinkButtonAnimated>Or Create Code</LinkButtonAnimated>
            <p className="text-xs text-muted-foreground">
              You are inviting new Member to{" "}
              <span className="font-bold">{activeCompany.name}</span>
            </p>
          </div>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};

export default InviteMemberModal;
