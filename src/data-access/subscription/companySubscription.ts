import prisma from "@/lib/prisma";
import { cache } from "react";
export type CompanySubscriptionLevel = "FREE" | "PRO" | "ELITE";

export const getCompanySubscriptionLevel = cache(
  async (companyId: string): Promise<CompanySubscriptionLevel> => {
    const subscription = await prisma.companySubscription.findUnique({
      where: { companyId },
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
