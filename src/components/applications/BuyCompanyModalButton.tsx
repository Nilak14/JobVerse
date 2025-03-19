"use client";

import { Button } from "../ui/button";
import useCompanyPremiumModal from "@/store/useCompanyPremiumModal";

const BuyCompanyPremiumModalButton = () => {
  const { setOpenCompanyPremiumModal } = useCompanyPremiumModal();
  return (
    <Button onClick={() => setOpenCompanyPremiumModal(true)}>
      Upgrade Now
    </Button>
  );
};
export default BuyCompanyPremiumModalButton;
