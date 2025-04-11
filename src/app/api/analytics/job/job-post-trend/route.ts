"use server";

import prisma from "@/lib/prisma";
import { monthNames } from "@/lib/utils";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const url = req.nextUrl;
    const yearParam = url.searchParams.get("year");
    if (!yearParam) {
      return Response.json(
        { success: false, message: "Year parameter is required" },
        { status: 400 }
      );
    }
    const year = parseInt(yearParam);

    const jobs = await prisma.job.findMany({
      where: {
        createdAt: {
          gte: new Date(`${year}-01-01T00:00:00.000Z`),
          lt: new Date(`${year + 1}-01-01T00:00:00.000Z`),
        },
      },
      select: {
        createdAt: true,
      },
    });

    const monthlyCounts = monthNames.map((month) => ({
      month,
      jobPosted: 0,
    }));

    jobs.forEach((job) => {
      const monthIndex = job.createdAt.getUTCMonth();
      monthlyCounts[monthIndex].jobPosted += 1;
    });
    return Response.json({ success: true, data: monthlyCounts });
  } catch (error) {
    console.error("Error:", error);
    return Response.json(
      { success: false, message: "Error fetching analytics data" },
      { status: 500 }
    );
  }
};
