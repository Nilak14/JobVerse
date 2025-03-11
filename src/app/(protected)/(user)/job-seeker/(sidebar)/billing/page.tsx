import ManageSubscriptionButton from "@/components/applications/ManageSubscriptionButton";
import { Badge } from "@/components/ui/badge";
import BoxReveal from "@/components/ui/box-reveal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserSubscription } from "@/data-access/subscription/getUserSubscription";
import { Metadata } from "next";
import { Suspense } from "react";
import Stripe from "stripe";
import * as motion from "motion/react-client";
import { formatDate } from "@/lib/utils";
export const metadata: Metadata = {
  title: "Billing | Manage Your JobVerse Billing Information",
  description: "Manage your JobVerse billing information",
};
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};
const BillingPage = async () => {
  return (
    <main>
      <BoxReveal>
        <div className="space-y-3">
          <h1 className=" text-xl md:text-2xl font-semibold tracking-tighter">
            Billing
          </h1>
          <p className="text-sm text-muted-foreground  tracking-wide">
            Manage your subscription and billing information
          </p>
        </div>
      </BoxReveal>
      <Suspense fallback={<div>Loading...</div>}>
        <BillingPageData />
      </Suspense>
    </main>
  );
};
export default BillingPage;

const BillingPageData = async () => {
  const { subscription, priceInfo } = await getUserSubscription();
  const currentPlan = priceInfo
    ? (priceInfo.product as Stripe.Product).name
    : "Free";
  return (
    <motion.div
      className="mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="p-6 bg-card">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Current Plan: {currentPlan}
            </h2>
            {currentPlan === "Free" ? (
              <p className="text-muted-foreground">
                Your next billing date will be shown here when you subscribe to
                a paid plan
              </p>
            ) : (
              <>
                {subscription?.stripeCancelAtPeriodEnd ? (
                  <>
                    <p className=" text-sm text-destructive">
                      Your Subscription will be cancelled on{" "}
                      {formatDate(subscription?.stripeCurrentPeriodEnd)}
                    </p>
                  </>
                ) : (
                  <>
                    {subscription?.stripeCurrentPeriodEnd && (
                      <p className="text-muted-foreground text-sm">
                        Your next billing date:{" "}
                        {formatDate(subscription?.stripeCurrentPeriodEnd)}
                      </p>
                    )}
                  </>
                )}
              </>
            )}
          </div>
          <ManageSubscriptionButton />
        </div>
      </Card>
    </motion.div>
  );
};
