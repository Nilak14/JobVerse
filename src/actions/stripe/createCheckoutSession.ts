"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";

export const createCheckoutSession = async (priceId: string) => {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("User not authenticated");
  }
  let stripeCustomerId: string | undefined;
  if (session.activeCompanyId) {
    const company = await prisma.company.findUnique({
      where: { id: session.activeCompanyId },
      select: { stripeCustomerId: true },
    });
    if (!company) {
      throw new Error("Company not found");
    }
    stripeCustomerId = company.stripeCustomerId || undefined;
  } else {
    stripeCustomerId = session.user.stripeCustomerId || undefined;
  }

  const success_url = session.activeCompanyId
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/employer/billing/success`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/job-seeker/billing/success`;
  const cancel_url = session.activeCompanyId
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/employer/billing`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/job-seeker/billing`;

  const stripeSession = await stripe.checkout.sessions.create({
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    success_url,
    cancel_url,
    customer: stripeCustomerId,
    customer_email: stripeCustomerId ? undefined : session.user.email!,
    metadata: {
      isCompany: session.activeCompanyId ? "TRUE" : "FALSE",
      userId: session.activeCompanyId
        ? session.activeCompanyId
        : session.user.id!,
    },
    subscription_data: {
      metadata: {
        isCompany: session.activeCompanyId ? "TRUE" : "FALSE",
        userId: session.activeCompanyId
          ? session.activeCompanyId
          : session.user.id!,
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
