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
    const application = await prisma.application.findMany({
      where: {
        job: {
          companyId: session.activeCompanyId,
        },
      },
    });
    const totalApplications = application.length;
    const acceptedCount = application.filter(
      (app) => app.status === "APPROVED"
    ).length;
    const rejectedCount = application.filter(
      (app) => app.status === "REJECTED"
    ).length;
    const pendingCount = application.filter(
      (app) => app.status === "PENDING"
    ).length;
    const interviewCount = application.filter(
      (app) => app.status === "INTERVIEW"
    ).length;
    return Response.json({
      success: true,
      data: {
        totalApplications,
        acceptedCount,
        rejectedCount,
        pendingCount,
        interviewCount,
      },
    });
  } catch (error) {
    return Response.json(
      { success: false, message: "Error fetching analytics data" },
      { status: 500 }
    );
  }
};
