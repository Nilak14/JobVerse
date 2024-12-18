"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExtendedUser } from "@/next-auth";
import { useInvitationModal } from "@/store/useInvitaionModal";

interface InvitationsModalProps {
  user: ExtendedUser;
}

//todo Add responsive dialog modal
const InvitationsModal = ({ user }: InvitationsModalProps) => {
  const { openInvitationModal, setOpenInvitationModal } = useInvitationModal();
  return (
    <Dialog open={openInvitationModal} onOpenChange={setOpenInvitationModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invitations</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
export default InvitationsModal;
