import { create } from "zustand";

interface PremiumModalState {
  openCompanyPremiumModal: boolean;
  setOpenCompanyPremiumModal: (open: boolean) => void;
}

const useCompanyPremiumModal = create<PremiumModalState>((set) => ({
  openCompanyPremiumModal: false,
  setOpenCompanyPremiumModal: (openCompanyPremiumModal) =>
    set({ openCompanyPremiumModal }),
}));

export default useCompanyPremiumModal;
