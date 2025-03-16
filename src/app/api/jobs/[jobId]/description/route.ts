import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { getJobDataIncludeDescription } from "@/lib/prisma-types/Job";
import { s } from "framer-motion/client";
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
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
      },
      select: getJobDataIncludeDescription(),
    });
    return Response.json({
      success: true,
      data: job,
      message:"Job Fetched Sucesfully"
    }, { status: 200 });
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
