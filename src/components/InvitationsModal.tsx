"use client";

import { ExtendedUser } from "@/next-auth";
import { useInvitationModal } from "@/store/useInvitaionModal";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalDescription,
  ResponsiveModalFooter,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
} from "./ui/responsive-dailog";
import { useQueryEmployerPendingInvitations } from "@/hooks/query-hooks/getEmployerPendingInvitations";
import {
  EmployerPendingInvitations,
  EmployerPendingInvitationsResponse,
} from "@/lib/prisma-types/Invitations";
import { AnimatedList } from "./ui/animated-list";
import UserAvatar from "./Global/Useravatar";
import { Building, Check, RefreshCcw, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import EmployerSearchSkeleton from "./skeletons/EmployerSearchSkeleton";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { usePendingInvitationsCount } from "@/store/usePendingInvitationsCount";
import { useEffect, useState } from "react";
import { useAction } from "next-safe-action/hooks";
import { rejectInvitaion } from "@/actions/invitations/rejectInvitation";
import { toast } from "sonner";
import LoadingButton from "./ui/loading-button";
import { QueryKey, useQueryClient } from "react-query";
import { acceptInvitation } from "@/actions/invitations/acceptInvitation";
import { signOut } from "next-auth/react";
import { pusherClient } from "@/lib/pusher/client";
import { useRouter } from "next/navigation";
interface InvitationsModalProps {
  user: ExtendedUser;
}

const InvitationsModal = ({ user }: InvitationsModalProps) => {
  const { openInvitationModal, setOpenInvitationModal } = useInvitationModal();
  const queryClient = useQueryClient();
  const { data, refetch, isLoading, isRefetching } =
    useQueryEmployerPendingInvitations();
  const [loadingRejectInvitaionButtonId, setLoadingRejectInvitaionButtonId] =
    useState<string | null>(null);
  const [loadingAcceptInvitaionButtonId, setLoadingAcceptInvitaionButtonId] =
    useState<string | null>(null);
  const { setPendingInvitationsCount, pendingInvitationsCount } =
    usePendingInvitationsCount();
  const router = useRouter();

  // ------------------------------ Reject Invitation ------------------------------
  const { execute: executeRejectInvitation, status: rejectInvitationStatus } =
    useAction(rejectInvitaion, {
      onSuccess: async ({ data }) => {
        if (data?.success) {
          const queryFilter: QueryKey = ["employer-pending-invitations"];
          queryClient.cancelQueries(queryFilter);
          queryClient.setQueryData<EmployerPendingInvitationsResponse>(
            queryFilter,
            (oldData) => {
              if (!oldData) return oldData!;
              return {
                ...oldData,
                data: {
                  ...oldData.data,
                  invitations:
                    oldData.data.invitations.filter(
                      (invitation) => invitation.id !== data.data?.id
                    ) ?? [],
                },
              };
            }
          );
          if (pendingInvitationsCount > 0) {
            setPendingInvitationsCount(pendingInvitationsCount - 1);
          } else {
            setPendingInvitationsCount(0);
          }
          setLoadingRejectInvitaionButtonId(null);

          toast.success(data.message);
        } else {
          if (data?.status === 403) {
            await signOut();
          }
          setLoadingRejectInvitaionButtonId(null);
          toast.error(data?.message);
        }
      },
      onExecute: ({ input }) => {
        setLoadingRejectInvitaionButtonId(input.invitationId);
      },
      onError: () => {
        setLoadingRejectInvitaionButtonId(null);
      },
    });

  // ------------------------------ Accept Invitation ------------------------------
  const { execute: executeAcceptInvitation, status: acceptInvitationStatus } =
    useAction(acceptInvitation, {
      onSuccess: async ({ data, input }) => {
        if (data?.success) {
          const queryFilter: QueryKey = ["employer-pending-invitations"];
          // queryClient.cancelQueries(queryFilter);
          queryClient.setQueryData<EmployerPendingInvitationsResponse>(
            queryFilter,
            (oldData) => {
              if (!oldData) return oldData!;
              return {
                ...oldData,
                data: {
                  ...oldData.data,
                  invitations:
                    oldData.data.invitations.filter(
                      (invitation) => invitation.id !== input.invitationId
                    ) ?? [],
                },
              };
            }
          );
          if (pendingInvitationsCount > 0) {
            setPendingInvitationsCount(pendingInvitationsCount - 1);
          } else {
            setPendingInvitationsCount(0);
          }
          setLoadingAcceptInvitaionButtonId(null);
          queryClient.invalidateQueries({ queryKey: ["companies"] });
          router.refresh();
          setOpenInvitationModal(false);
          toast.success(data.message, { icon: <Building /> });
        } else {
          if (data?.status === 403) {
            await signOut();
          }
          setLoadingAcceptInvitaionButtonId(null);
          toast.error(data?.message);
        }
      },
      onExecute: ({ input }) => {
        setLoadingAcceptInvitaionButtonId(input.invitationId);
      },
      onError: () => {
        setLoadingAcceptInvitaionButtonId(null);
      },
    });

  useEffect(() => {
    if (data?.data.invitations.length) {
      setPendingInvitationsCount(data?.data.invitations.length);
    }
  }, [data?.data.invitations.length]);

  useEffect(() => {
    if (!user.id) {
      console.log("User id not found");
      return;
    }
    const invitationChannel = pusherClient.subscribe(user.id);

    invitationChannel.bind("invitation", (data: EmployerPendingInvitations) => {
      const queryFilter: QueryKey = ["employer-pending-invitations"];
      queryClient.cancelQueries(queryFilter);
      queryClient.setQueryData<EmployerPendingInvitationsResponse>(
        queryFilter,
        (oldData) => {
          if (!oldData) return oldData!;
          const existingInvitation = oldData.data.invitations.some(
            (invitation) => {
              if (invitation.id === data.id) {
                return true;
              }
            }
          );
          if (existingInvitation) return oldData;
          return {
            ...oldData,
            data: {
              ...oldData.data,
              invitations: [data, ...oldData.data.invitations],
            },
          };
        }
      );
    });

    return () => {
      invitationChannel.unbind_all();
      pusherClient.unbind("invitation");
      pusherClient.unsubscribe(user.id!);
    };
  }, [user.id]);

  const rejectInvitaionHandler = (invitationId: string) => {
    executeRejectInvitation({ invitationId });
  };
  const acceptInvitationHandler = (invitationId: string) => {
    executeAcceptInvitation({ invitationId });
  };

  return (
    <ResponsiveModal
      open={openInvitationModal}
      onOpenChange={setOpenInvitationModal}
    >
      <ResponsiveModalContent className="space-y-5 md:space-y-0 overflow-x-hidden">
        <ResponsiveModalHeader>
          <ResponsiveModalTitle>Your Pending Invitations</ResponsiveModalTitle>
          <ResponsiveModalDescription>
            This is your pending invitation accept or reject them
          </ResponsiveModalDescription>
        </ResponsiveModalHeader>
        <section className=" flex flex-col space-y-3 max-h-[246px] over-x-hidden overflow-y-auto">
          {" "}
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <p
                  role="button"
                  onClick={() => {
                    refetch();
                  }}
                  className={cn(
                    "relative  h-9 w-9 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground inline-flex items-center justify-center gap-2  active:scale-95 transition-transform duration-300 whitespace-nowrap rounded-md text-sm font-medium  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 self-end cursor-pointer",
                    (rejectInvitationStatus === "executing" ||
                      acceptInvitationStatus === "executing") &&
                      "pointer-events-none opacity-50"
                  )}
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
            !isRefetching &&
            data?.data.invitations.length >= 1 &&
            data?.data.invitations.map(
              (invitations: EmployerPendingInvitations) => {
                return (
                  <AnimatedList key={invitations.id}>
                    <div className="border-input border w-full p-4 rounded-lg flex items-center justify-between">
                      <div className="flex items-center   gap-5 w-full truncate ">
                        <UserAvatar
                          imageUrl={invitations.company.logoUrl || ""}
                          userName={invitations.company.name}
                        />
                        <div className="max-w-[85%] ">
                          <p className="truncate mr-3">
                            {invitations.company.name}
                          </p>
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
                      <div className="flex items-center gap-4 justify-end">
                        <LoadingButton
                          onClick={() => {
                            acceptInvitationHandler(invitations.id);
                          }}
                          loading={
                            loadingAcceptInvitaionButtonId === invitations.id
                          }
                          showIconOnly
                          disabled={
                            rejectInvitationStatus === "executing" ||
                            acceptInvitationStatus === "executing"
                          }
                          className="bg-green-600 border-green-600
                          outline-green-600 hover:bg-green-700
                          active:outline-green-600"
                          size={"icon"}
                        >
                          <span className="font-bold">
                            <Check />
                          </span>
                        </LoadingButton>
                        <LoadingButton
                          disabled={
                            rejectInvitationStatus === "executing" ||
                            acceptInvitationStatus === "executing"
                          }
                          showIconOnly
                          loading={
                            loadingRejectInvitaionButtonId === invitations.id
                          }
                          onClick={() => {
                            rejectInvitaionHandler(invitations.id);
                          }}
                          variant={"destructive"}
                          size={"icon"}
                        >
                          <span>
                            <X />
                          </span>
                        </LoadingButton>
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
          {!isLoading &&
            !isRefetching &&
            data?.data.invitations.length === 0 && (
              <motion.p
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
                className="text-muted-foreground text-sm text-center"
              >
                No pending invitations found
              </motion.p>
            )}
        </section>
        <ResponsiveModalFooter>
          <div className="text-center w-full space-y-5 ">
            <p className="text-xs text-muted-foreground">
              Accepting the invitation will allow you to access the company
            </p>
          </div>
        </ResponsiveModalFooter>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};
export default InvitationsModal;
