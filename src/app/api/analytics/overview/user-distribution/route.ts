"use server";

import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const user = await prisma.user.findMany({
      where: {
        userType: {
          not: "ADMIN",
        },
      },
    });
    const totalUsers = user.length;
    const jobSeekerCount = user.filter(
      (user) => user.userType === "JOB_SEEKER"
    ).length;
    const employerCount = user.filter(
      (user) => user.userType === "EMPLOYER"
    ).length;

    return Response.json({
      success: true,
      data: {
        totalUsers,
        jobSeekerCount,
        employerCount,
      },
    });
  } catch (error) {
    return Response.json(
      { success: false, message: "Error fetching analytics data" },
      { status: 500 }
    );
  }
};
