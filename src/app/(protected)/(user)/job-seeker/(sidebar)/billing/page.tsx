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
import BuyPremiumModalButton from "@/components/applications/BuyPremiumModalButton";
import { JobSeekerPlans } from "@/lib/data";
import BillingSkeleton from "@/components/skeletons/BillingPageSkeleton";
export const metadata: Metadata = {
  title: "Billing | Manage Your JobVerse Billing Information",
  description: "Manage your JobVerse billing information",
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
      <Suspense fallback={<BillingSkeleton />}>
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
          {currentPlan === "Free" ? (
            <BuyPremiumModalButton />
          ) : (
            <ManageSubscriptionButton />
          )}
        </div>
      </Card>
      <motion.div variants={item} className="mt-5">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Plan Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Desktop view - horizontal table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Feature</th>
                    {JobSeekerPlans.map((plan) => (
                      <th key={plan.name} className="text-left py-3 px-4">
                        {plan.name}
                        <div className="text-muted-foreground font-normal">
                          {plan.price}/month
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Apply Job</td>
                    {JobSeekerPlans.map((plan) => (
                      <td key={`${plan.name}-apply`} className="py-3 px-4">
                        {plan.features.applyJob.value}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Create Resume</td>
                    {JobSeekerPlans.map((plan) => (
                      <td key={`${plan.name}-create`} className="py-3 px-4">
                        {plan.features.createResume.value}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b">
                    <td className="py-3 px-4 font-medium">Customize Resume</td>
                    {JobSeekerPlans.map((plan) => (
                      <td key={`${plan.name}-customize`} className="py-3 px-4">
                        {/* {plan.features.customizeResume.value} */}
                        {plan.features.customizeResume.available ? (
                          <span className="text-primary font-medium">
                            ✓ {plan.features.customizeResume.value}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">
                            ✗ {plan.features.customizeResume.value}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">
                      Create Resume with AI
                    </td>
                    {JobSeekerPlans.map((plan) => (
                      <td key={`${plan.name}-ai`} className="py-3 px-4">
                        {plan.features.createResumeAI.available ? (
                          <span className="text-primary font-medium">
                            ✓ {plan.features.createResumeAI.value}
                          </span>
                        ) : (
                          <span className="text-muted-foreground">
                            ✗ {plan.features.createResumeAI.value}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Mobile view - cards for each plan */}
            <div className="md:hidden space-y-6">
              {JobSeekerPlans.map((plan) => (
                <div key={plan.name} className="border rounded-lg p-4">
                  <div className="text-lg font-bold mb-2">{plan.name}</div>
                  <div className="text-muted-foreground mb-4">
                    {plan.price}/month
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Apply Job</span>
                      <span>{plan.features.applyJob.value}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium">Create Resume</span>
                      <span>{plan.features.createResume.value}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium">Customize Resume</span>
                      <span>{plan.features.customizeResume.value}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="font-medium">Create Resume with AI</span>
                      {plan.features.createResumeAI.available ? (
                        <span className="text-primary font-medium">
                          ✓ {plan.features.createResumeAI.value}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">
                          ✗ {plan.features.createResumeAI.value}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};
