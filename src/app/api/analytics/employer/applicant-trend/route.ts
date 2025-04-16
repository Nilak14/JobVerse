"use server";

import { auth } from "@/lib/auth";
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
    const session = await auth();
    if (!session || !session.activeCompanyId) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const year = parseInt(yearParam);
    const applicants = await prisma.application.findMany({
      where: {
        job: {
          companyId: session.activeCompanyId,
        },
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
      totalApplicant: 0,
    }));
    applicants.forEach((applicant) => {
      const monthIndex = applicant.createdAt.getUTCMonth(); // 0-based index
      monthlyCounts[monthIndex].totalApplicant += 1;
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
