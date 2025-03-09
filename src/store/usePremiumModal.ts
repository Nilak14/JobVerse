import { create } from "zustand";

interface PremiumModalState {
  openPremiumModal: boolean;
  setOpenPremiumModal: (open: boolean) => void;
}

const usePremiumModal = create<PremiumModalState>((set) => ({
  openPremiumModal: false,
  setOpenPremiumModal: (openPremiumModal) => set({ openPremiumModal }),
}));

export default usePremiumModal;
