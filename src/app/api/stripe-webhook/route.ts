import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { NextRequest } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
  try {
    const payload = await req.text();
    const signature = req.headers.get("stripe-signature");
    if (!signature) {
      return Response.json(
        { success: false, message: "Invalid Signature" },
        { status: 400 }
      );
    }
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log(`Received event: ${event.type}`, event.data.object);
    switch (event.type) {
      case "checkout.session.completed":
        await handleSessionCompleted(event.data.object);
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionCreatedOrUpdated(event.data.object.id);
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
        break;
    }
    return Response.json(
      { success: true, message: "Event Received" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Something went wrong.Please Try Again" },
      { status: 500 }
    );
  }
};

async function handleSessionCompleted(session: Stripe.Checkout.Session) {
  console.log("Checkout Session Completed");
  const userId = session.metadata?.userId;
  if (!userId) {
    throw new Error("User ID is missing in session metadata");
  }
  await prisma.user.update({
    where: { id: userId },
    data: { stripeCustomerId: session.customer as string },
  });
}
async function handleSubscriptionCreatedOrUpdated(subscriptionId: string) {
  console.log("Subscription Created/Updated");

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  if (
    subscription.status === "active" ||
    subscription.status === "trialing" ||
    subscription.status === "past_due"
  ) {
    await prisma.userSubscription.upsert({
      where: {
        userId: subscription.metadata?.userId as string,
      },
      create: {
        userId: subscription.metadata?.userId as string,
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        stripePriceId: subscription.items.data[0].price.id,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
        stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
      update: {
        stripePriceId: subscription.items.data[0].price.id,
        stripeCancelAtPeriodEnd: subscription.cancel_at_period_end,
        stripeCurrentPeriodEnd: new Date(
          subscription.current_period_end * 1000
        ),
      },
    });
  } else {
    console.log("deleted ");
    await prisma.userSubscription.deleteMany({
      where: {
        stripeCustomerId: subscription.customer as string,
      },
    });
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log("Subscription Deleted");
  await prisma.userSubscription.deleteMany({
    where: {
      stripeCustomerId: subscription.customer as string,
    },
  });
}
