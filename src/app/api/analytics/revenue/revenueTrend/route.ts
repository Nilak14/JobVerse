"use server";

import { NextRequest } from "next/server";
import stripe from "@/lib/stripe";
import { monthNames } from "@/lib/utils";

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const year = url.searchParams.get("year");

    if (!year) {
      return Response.json(
        { success: false, message: "Year parameter is required" },
        { status: 400 }
      );
    }

    const yearNumber = parseInt(year, 10);

    // Process each month (0 for January, 11 for December)
    const data = await Promise.all(
      monthNames.map(async (monthName, index) => {
        // Define the start and end dates in local time
        const startDate = new Date(yearNumber, index, 1);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(yearNumber, index + 1, 0);
        endDate.setHours(23, 59, 59, 999);

        // Convert local dates to UNIX timestamps (seconds) for Stripe
        const startTimestamp = Math.floor(startDate.getTime() / 1000);
        const endTimestamp = Math.floor(endDate.getTime() / 1000);

        // Call Stripe API to fetch charges within this month's range (limit 100)
        const charges = await stripe.charges.list({
          created: {
            gte: startTimestamp,
            lte: endTimestamp,
          },
          limit: 100,
        });

        // Sum revenue from charges: only include those that are paid and not refunded
        const totalRevenue =
          charges.data
            .filter((charge) => charge.paid && !charge.refunded)
            .reduce((sum, charge) => sum + charge.amount, 0) / 100;

        return { month: monthName, total: totalRevenue };
      })
    );
    const totalRevenueYear = data.reduce(
      (sum, monthData) => sum + monthData.total,
      0
    );

    return Response.json({
      success: true,
      data: {
        chartData: data,
        totalRevenue: totalRevenueYear,
      },
    });
  } catch (error) {
    console.error("Revenue API error:", error);
    return Response.json(
      { success: false, message: "Error fetching revenue data" },
      { status: 500 }
    );
  }
};
