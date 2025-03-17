import prisma from "@/lib/prisma";
import { cache } from "react";

export type EmployerSubscriptionLevel = "FREE" | "PRO" | "ELITE";

export const getEmployerSubscription = cache(
  async (companyId: string): Promise<EmployerSubscriptionLevel> => {
    const subscription = await prisma.userSubscription.findUnique({
      where: {
        userId: companyId,
      },
    });
    if (!subscription || subscription.stripeCurrentPeriodEnd < new Date()) {
      return "FREE";
    }
    if (
      subscription.stripePriceId ===
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY_EMPLOYER
    ) {
      return "PRO";
    }
    if (
      subscription.stripePriceId ===
      process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ELITE_MONTHLY_EMPLOYER
    ) {
      return "ELITE";
    }
    throw new Error("Invalid subscription");
  }
);
