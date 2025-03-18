"use server";

import { auth } from "@/lib/auth";
import stripe from "@/lib/stripe";

export const createCheckoutSession = async (priceId: string) => {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("User not authenticated");
  }

  const stripeCustomerId = session.user.stripeCustomerId || undefined;

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/job-seeker/billing/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/job-seeker/billing`,
    customer: stripeCustomerId,
    customer_email: stripeCustomerId ? undefined : session.user.email!,
    metadata: {
      userId: session.user.id!,
    },
    subscription_data: {
      metadata: {
        userId: session.user.id!,
      },
    },
    custom_text: {
      terms_of_service_acceptance: {
        message: `I have read JobVerse's [terms of service](${process.env.NEXT_PUBLIC_BASE_URL}/terms) and agree to them.`,
      },
    },
    consent_collection: {
      terms_of_service: "required",
    },
  });
  if (!stripeSession.url) {
    throw new Error("Failed to proceed with payment");
  }
  return stripeSession.url;
};
