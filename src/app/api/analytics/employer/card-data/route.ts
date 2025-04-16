"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session || !session.activeCompanyId) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const [jobCreated, activeJobs, totalApplicants, pendingApplicants] =
      await Promise.all([
        prisma.job.count({
          where: {
            companyId: session.activeCompanyId,
          },
        }),
        prisma.job.count({
          where: {
            companyId: session.activeCompanyId,
            status: "ACTIVE",
          },
        }),
        prisma.application.count({
          where: {
            job: {
              companyId: session.activeCompanyId,
            },
          },
        }),
        prisma.application.count({
          where: {
            job: {
              companyId: session.activeCompanyId,
            },
            status: "PENDING",
          },
        }),
      ]);
    return Response.json(
      {
        success: true,
        data: {
          jobCreated,
          activeJobs,
          totalApplicants,
          pendingApplicants,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Analytics error:", error);
    return Response.json(
      { success: false, message: "Error fetching analytics data" },
      { status: 500 }
    );
  }
};
