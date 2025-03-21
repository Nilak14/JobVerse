import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { CompanySubscription } from "@prisma/client";
import { cache } from "react";
import Stripe from "stripe";

export const getCompanySubscription = cache(
  async (): Promise<{
    subscription: CompanySubscription | null;
    priceInfo: Stripe.Price | null;
  }> => {
    try {
      const session = await auth();
      if (!session || !session.activeCompanyId) {
        return { subscription: null, priceInfo: null };
      }
      const subscription = await prisma.companySubscription.findUnique({
        where: { companyId: session.activeCompanyId },
      });
      const priceInfo = subscription
        ? await stripe.prices.retrieve(subscription.stripePriceId, {
            expand: ["product"],
          })
        : null;
      return { subscription, priceInfo };
    } catch (error) {
      return { subscription: null, priceInfo: null };
    }
  }
);
