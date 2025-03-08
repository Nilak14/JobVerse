"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  getJobSeekerProfileSelectForApplication,
  JobSeekerProfileResponse,
} from "@/lib/prisma-types/JobSeekerProfile";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session || !session.user || !session.jobSeekerId) {
      return Response.json({ message: "Unauthorized" }, { status: 403 });
    }
    if (session.user.isBlocked) {
      return Response.json({ message: "Blocked" }, { status: 403 });
    }

    const jobSeekerProfile = await prisma.user.findUnique({
      where: {
        id: session.user.id,
        userType: "JOB_SEEKER",
      },
      select: getJobSeekerProfileSelectForApplication(),
    });

    if (!jobSeekerProfile) {
      return Response.json({ message: "Not found" }, { status: 404 });
    }

    const data: JobSeekerProfileResponse = {
      success: true,
      message: "Job Seeker Profile Fetched Successfully",
      data: jobSeekerProfile,
    };
    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
};
