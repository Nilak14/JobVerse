"use client";

import usePremiumModal from "@/store/usePremiumModal";
import { Button } from "../ui/button";

const BuyPremiumModalButton = () => {
  const { setOpenPremiumModal } = usePremiumModal();
  return <Button onClick={() => setOpenPremiumModal(true)}>Upgrade Now</Button>;
};
export default BuyPremiumModalButton;
