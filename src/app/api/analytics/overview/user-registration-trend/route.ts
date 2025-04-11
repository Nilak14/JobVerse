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

    // Get all users created in the given year (excluding admins)
    const users = await prisma.user.findMany({
      where: {
        userType: {
          in: ["JOB_SEEKER", "EMPLOYER"],
        },
        createdAt: {
          gte: new Date(`${year}-01-01T00:00:00.000Z`),
          lt: new Date(`${year + 1}-01-01T00:00:00.000Z`),
        },
      },
      select: {
        createdAt: true,
        userType: true,
      },
    });
    const monthlyCounts = monthNames.map((month) => ({
      month,
      job_seeker: 0,
      employer: 0,
    }));

    users.forEach((user) => {
      const monthIndex = user.createdAt.getUTCMonth(); // 0-based index
      if (user.userType === "JOB_SEEKER") {
        monthlyCounts[monthIndex].job_seeker += 1;
      } else if (user.userType === "EMPLOYER") {
        monthlyCounts[monthIndex].employer += 1;
      }
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
