"use server";

import prisma from "@/lib/prisma";
import stripe from "@/lib/stripe";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    // Fetch new users, active jobs, charges, and subscriptions within the date range
    const [newUsers, activeJobs, charges, subscriptions] = await Promise.all([
      prisma.user.count({
        where: {
          userType: {
            not: "ADMIN",
          },
        },
      }),

      prisma.job.count({
        where: {
          status: "ACTIVE",
        },
      }),

      stripe.charges.list({
        limit: 100,
      }),

      stripe.subscriptions.list({
        status: "active",
        limit: 100,
      }),
    ]);

    // Calculate total revenue from Stripe charges
    const totalRevenue =
      charges.data
        .filter((charge) => charge.paid && !charge.refunded)
        .reduce((sum, charge) => sum + charge.amount, 0) / 100; // Convert to dollars

    // Calculate the number of active subscriptions
    const activeSubscriptions = subscriptions.data.length;

    return Response.json({
      success: true,
      data: {
        newUsers,
        activeJobs,
        totalRevenue,
        activeSubscriptions,
      },
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return Response.json(
      { success: false, message: "Error fetching analytics data" },
      { status: 500 }
    );
  }
};
