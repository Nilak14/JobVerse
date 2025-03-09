"use server";

import { auth } from "@/lib/auth";
import stripe from "@/lib/stripe";

export const createCustomerPortalSession = async () => {
  const session = await auth();
  if (!session || !session.user || !session.user.stripeCustomerId) {
    throw new Error("User not authenticated");
  }
  const stripeCustomerId: string = session.user.stripeCustomerId;
  const stipeSession = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/job-seeker/billing`,
  });
  if (!stipeSession.url) {
    throw new Error("Could not create customer portal session");
  }
  return stipeSession.url;
};
