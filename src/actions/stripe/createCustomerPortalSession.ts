"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";

export const createCustomerPortalSession = async () => {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error("User not authenticated");
  }
  let stripeCustomerId: string;
  if (session.activeCompanyId) {
    const company = await prisma.company.findUnique({
      where: { id: session.activeCompanyId },
      select: { stripeCustomerId: true },
    });
    if (!company || !company.stripeCustomerId) {
      throw new Error("Company not found");
    }
    stripeCustomerId = company.stripeCustomerId;
  } else {
    if (!session.user.stripeCustomerId) {
      throw new Error("User not authenticated");
    }
    stripeCustomerId = session.user.stripeCustomerId;
  }
  const return_url = session.activeCompanyId
    ? `${process.env.NEXT_PUBLIC_BASE_URL}/employer/billing`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/job-seeker/billing`;

  const stipeSession = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url,
  });
  if (!stipeSession.url) {
    throw new Error("Could not create customer portal session");
  }
  return stipeSession.url;
};
