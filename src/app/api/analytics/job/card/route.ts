"use server";

import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const [totalJobs, activeJobs, totalApplications] = await Promise.all([
      prisma.job.count(),

      prisma.job.count({
        where: {
          status: "ACTIVE",
        },
      }),

      prisma.application.count(),
    ]);
    return Response.json({
      success: true,
      data: {
        totalJobs,
        activeJobs,
        totalApplications,
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
