"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getJobSeekerProfileSelectForApplication } from "@/lib/prisma-types/JobSeekerProfile";
import { handleError, jobSeekerProfileCompletionPercentage } from "@/lib/utils";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session || !session.jobSeekerId) {
      return Response.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }
    const [totalApplication, jobSaved, profile] = await Promise.all([
      prisma.application.count({
        where: {
          jobSeekerId: session.jobSeekerId,
        },
      }),
      prisma.savedJob.count({
        where: {
          userId: session.jobSeekerId,
        },
      }),
      prisma.user.findUnique({
        where: {
          id: session.user.id,
          userType: "JOB_SEEKER",
        },
        select: getJobSeekerProfileSelectForApplication(),
      }),
    ]);

    const profileCompletion = jobSeekerProfileCompletionPercentage(profile!);

    return Response.json({
      success: true,
      data: {
        totalApplication,
        jobSaved,
        profileCompletion,
      },
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error fetching analytics data",
      },
      { status: 500 }
    );
  }
};
