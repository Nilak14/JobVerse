import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { SaveJobResponse } from "@/lib/types";
import { NextRequest } from "next/server";

type Params = Promise<{ jobId: string }>;

export const GET = async (
  req: NextRequest,
  segmentData: { params: Params }
) => {
  try {
    const params = await segmentData.params;
    const jobId = params.jobId;
    const session = await auth();
    if (!session || !session.user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (session.user.isBlocked) {
      return Response.json({ message: "Blocked" }, { status: 403 });
    }
    const jobSeeker = await prisma.jOB_SEEKER.findUnique({
      where: { userId: session.user.id },
    });
    if (!jobSeeker) {
      return Response.json(
        { message: "No job seeker record found for the user." },
        { status: 403 }
      );
    }
    const savedJob = await prisma.savedJob.findUnique({
      where: {
        userId_jobId: {
          userId: jobSeeker.id,
          jobId,
        },
      },
    });
    const data: SaveJobResponse = {
      message: "Saved Job Fetched successfully",
      success: true,
      data: {
        data: {
          isSavedByUser: !!savedJob,
        },
      },
    };
    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
};

export const POST = async (
  req: NextRequest,
  segmentData: { params: Params }
) => {
  try {
    const params = await segmentData.params;
    const jobId = params.jobId;
    console.log(jobId);

    const session = await auth();
    console.log(session?.jobSeekerId);

    if (
      !session ||
      session.user.type !== "JOB_SEEKER" ||
      !session.jobSeekerId
    ) {
      return Response.json(
        { success: false, message: "Unauthorized Request" },
        { status: 401 }
      );
    }
    await prisma.savedJob.upsert({
      where: {
        userId_jobId: {
          userId: session.jobSeekerId,
          jobId,
        },
      },
      create: {
        userId: session.jobSeekerId,
        jobId,
      },
      update: {},
    });
    return Response.json({
      success: true,
      message: "Job saved successfully",
    });
  } catch (error) {
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: NextRequest,
  segmentData: { params: Params }
) => {
  try {
    const params = await segmentData.params;
    const jobId = params.jobId;

    const session = await auth();
    if (
      !session ||
      session.user.type !== "JOB_SEEKER" ||
      !session.jobSeekerId
    ) {
      return Response.json(
        { success: false, message: "Unauthorized Request" },
        { status: 401 }
      );
    }
    await prisma.savedJob.deleteMany({
      where: {
        userId: session.jobSeekerId,
        jobId,
      },
    });
    return Response.json({
      success: true,
      message: "Removed Job From Saved List",
    });
  } catch (error) {
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
