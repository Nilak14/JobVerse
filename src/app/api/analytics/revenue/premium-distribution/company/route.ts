"use server";

import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const totalCompany = await prisma.company.count({
      where: {
        isDeleted: false,
      },
    });
    const companySubscriptions = await prisma.companySubscription.findMany({
      select: {
        stripePriceId: true,
      },
    });
    const proUserCount = companySubscriptions.filter(
      (subscription) =>
        subscription.stripePriceId ===
        process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY
    ).length;
    const eliteUserCount = companySubscriptions.filter(
      (subscription) =>
        subscription.stripePriceId ===
        process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ELITE_MONTHLY
    ).length;
    const freeUserCount = totalCompany - proUserCount - eliteUserCount;

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
