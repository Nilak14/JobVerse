import { create } from "zustand";

interface InvitationModalProps {
  openInvitationModal: boolean;
  setOpenInvitationModal: (openPremiumModal: boolean) => void;
}

export const useInvitationModal = create<InvitationModalProps>((set) => ({
  openInvitationModal: false,
  setOpenInvitationModal: (openInvitationModal) => set({ openInvitationModal }),
}));
