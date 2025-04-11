"use server";

import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const totalJobSeeker = await prisma.user.count({
      where: {
        userType: "JOB_SEEKER",
      },
    });
    const jobSeekerSubscriptions = await prisma.userSubscription.findMany({
      select: {
        stripePriceId: true,
      },
    });
    const proUserCount = jobSeekerSubscriptions.filter(
      (subscription) =>
        subscription.stripePriceId ===
        process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY
    ).length;
    const eliteUserCount = jobSeekerSubscriptions.filter(
      (subscription) =>
        subscription.stripePriceId ===
        process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ELITE_MONTHLY
    ).length;
    const freeUserCount = totalJobSeeker - proUserCount - eliteUserCount;

    const data = [
      {
        type: "PRO",
        total: proUserCount,
        fill: "hsl(var(--chart-1))",
      },
      {
        type: "FREE",
        total: freeUserCount,
        fill: "hsl(var(--chart-2))",
      },
      {
        type: "ELITE",
        total: eliteUserCount,
        fill: "hsl(var(--chart-3))",
      },
    ];
    return Response.json({
      success: true,
      data,
    });
  } catch (error) {
    return Response.json(
      { success: false, message: "Error fetching analytics data" },
      { status: 500 }
    );
  }
};
