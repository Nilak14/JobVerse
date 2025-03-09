import prisma from "@/lib/prisma";
import { cache } from "react";

export type JobSeekerSubscriptionLevel = "FREE" | "PRO" | "ELITE";

export const getJobSeekerSubscriptionLevel = cache(
  async (userId: string): Promise<JobSeekerSubscriptionLevel> => {
    const subscription = await prisma.userSubscription.findUnique({
      where: { userId },
    });
    if (!subscription || subscription.stripeCurrentPeriodEnd < new Date()) {
      return "FREE";
    }
    if (
      subscription.stripePriceId ===
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY
    ) {
      return "PRO";
    }
    if (
      subscription.stripePriceId ===
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ELITE_MONTHLY
    ) {
      return "ELITE";
    }
    throw new Error("Invalid subscription");
  }
);
