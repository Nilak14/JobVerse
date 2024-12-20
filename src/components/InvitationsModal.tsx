"use client";

import { ExtendedUser } from "@/next-auth";
import { useInvitationModal } from "@/store/useInvitaionModal";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "./ui/responsive-dailog";
import { useQueryEmployerPendingInvitations } from "@/hooks/query-hooks/getEmployerPendingInvitations";
import { EmployerPendingInvitations } from "@/lib/prisma-types/Invitations";
import { AnimatedList } from "./ui/animated-list";
import UserAvatar from "./Global/Useravatar";
import { RefreshCcw } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import EmployerSearchSkeleton from "./skeletons/EmployerSearchSkeleton";
import { cn } from "@/lib/utils";

interface InvitationsModalProps {
  user: ExtendedUser;
}

const InvitationsModal = ({ user }: InvitationsModalProps) => {
  const { openInvitationModal, setOpenInvitationModal } = useInvitationModal();
  const { data, refetch, isLoading, isRefetching } =
    useQueryEmployerPendingInvitations();
  console.log(data);

  return (
    <ResponsiveModal
      open={openInvitationModal}
      onOpenChange={setOpenInvitationModal}
    >
      <ResponsiveModalContent className="space-y-5 md:space-y-0">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Your Pending Invitations</ResponsiveModalTitle>
          <ResponsiveModalDescription className="sr-only">
            Your Pending Invitations
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <section className=" flex flex-col space-y-3 max-h-[246px] over-x-hidden overflow-y-auto">
          {" "}
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <p
                  onClick={() => {
                    refetch();
                  }}
                  className="relative  h-9 w-9 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2  active:scale-95 transition-transform duration-300 whitespace-nowrap rounded-md text-sm font-medium  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 self-end cursor-pointer"
                >
                  <RefreshCcw
                    className={cn("w-4 h-4", isRefetching && "animate-spin")}
                  />
                </p>
              </TooltipTrigger>
              <TooltipContent side="top" sideOffset={10}>
                <p>Refresh Invitations</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          {!isLoading &&
            data?.data.invitations.length >= 1 &&
            data?.data.invitations.map(
              (invitations: EmployerPendingInvitations) => {
                return (
                  <AnimatedList key={invitations.id}>
                    <div className="border-input border w-full p-4 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-5 w-full truncate ">
                        <UserAvatar
                          imageUrl={invitations.company.logoUrl || ""}
                          userName={invitations.company.name}
                        />
                        <div className="max-w-[250px]  ">
                          <p className="truncate">{invitations.company.name}</p>
                          <p className="text-xs text-muted-foreground truncate flex items-center gap-2">
                            Invited By:
                            <span className="flex items-center gap-2 truncate">
                              {" "}
                              <UserAvatar
                                classname="size-5"
                                imageUrl={invitations.inviter.user.image || ""}
                                userName={invitations.inviter.user.name || ""}
                              />
                              <span className="truncate">
                                {invitations.inviter.user.name}
                              </span>
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </AnimatedList>
                );
              }
            )}
          {isLoading ||
            (isRefetching && (
              <AnimatedList delay={0.5}>
                <EmployerSearchSkeleton />
                <EmployerSearchSkeleton />
              </AnimatedList>
            ))}
        </section>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};
export default InvitationsModal;
