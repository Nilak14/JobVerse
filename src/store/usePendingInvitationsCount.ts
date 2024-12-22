import { create } from "zustand";

interface PendingInvitationCount {
  pendingInvitationsCount: number;
  setPendingInvitationsCount: (pendingInvitationsCount: number) => void;
}

export const usePendingInvitationsCount = create<PendingInvitationCount>(
  (set) => ({
    pendingInvitationsCount: 0,
    setPendingInvitationsCount: (pendingInvitationsCount) =>
      set({ pendingInvitationsCount }),
  })
);
