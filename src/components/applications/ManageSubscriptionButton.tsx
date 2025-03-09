"use client";

import { useState } from "react";
import LoadingButton from "../ui/loading-button";
import { toast } from "sonner";
import { createCustomerPortalSession } from "@/actions/stripe/createCustomerPortalSession";

const ManageSubscriptionButton = () => {
  const [loading, setLoading] = useState(false);
  const handleClick = async () => {
    try {
      const redirectUrl = await createCustomerPortalSession();
      window.location.href = redirectUrl;
    } catch (error) {
      console.log(error);
      toast.error(
        "An error occurred while trying to manage your subscription",
        { id: "manage-subscription" }
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <LoadingButton onClick={handleClick} loading={loading}>
      ManageSubscriptionButton
    </LoadingButton>
  );
};
export default ManageSubscriptionButton;
