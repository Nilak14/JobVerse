import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { UserSubscription } from "@prisma/client";
import { cache } from "react";
import Stripe from "stripe";

export const getUserSubscription = cache(
  async (): Promise<{
    subscription: UserSubscription | null;
    priceInfo: Stripe.Price | null;
  }> => {
    try {
      const session = await auth();
      if (!session || !session.user.id) {
        return { subscription: null, priceInfo: null };
      }
      const subscription = await prisma.userSubscription.findUnique({
        where: { userId: session.user.id },
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
