import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getJobDataIncludeBrowse } from "@/lib/prisma-types/Job";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session || !session.jobSeekerId || session.user.isBlocked) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const savedJobs = await prisma.savedJob.findMany({
      where: {
        userId: session.jobSeekerId,
      },
      include: {
        user: {
          select: {
            id: true,
          },
        },
        job: {
          select: getJobDataIncludeBrowse(),
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const jobs = savedJobs.map((sJob) => sJob.job);
    return Response.json({
      success: true,
      message: "Saved Jobs Fetched successfully",
      data: {
        jobs,
      },
    });
  } catch (error) {
    console.error("browse jobs", error);

    return Response.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
};
