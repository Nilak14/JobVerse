import ManageSubscriptionButton from "@/components/applications/ManageSubscriptionButton";
import { Button } from "@/components/ui/button";
import { getUserSubscription } from "@/data-access/subscription/getUserSubscription";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";
import Stripe from "stripe";

export const metadata: Metadata = {
  title: "Billing | Manage Your JobVerse Billing Information",
  description: "Manage your JobVerse billing information",
};
const BillingPage = async () => {
  const { subscription, priceInfo } = await getUserSubscription();
  return (
    <main>
      <h1 className="text-3xl font-bold">Billing</h1>
      <p>
        Your Current Plan:{" "}
        <span className="font-bold">
          {priceInfo ? (priceInfo.product as Stripe.Product).name : "Free"}
        </span>
      </p>
      {subscription ? (
        <>
          {subscription.stripeCancelAtPeriodEnd && (
            <p className="text-destructive">
              Your Subscription will be cancelled on{" "}
              {formatDate(subscription.stripeCurrentPeriodEnd)}
            </p>
          )}
          <ManageSubscriptionButton />
        </>
      ) : (
        <Button>Get Subscription</Button>
      )}
    </main>
  );
};
export default BillingPage;
