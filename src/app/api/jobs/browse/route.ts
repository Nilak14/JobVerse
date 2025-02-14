import prisma from "@/lib/prisma";
import {
  getJobDataIncludeBrowse,
  JobDataBrowseAPIResponse,
} from "@/lib/prisma-types/Job";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const PAGE_SIZE = 10 as const;

    //todo: not sure it user need to be authenticated to browse jobs or not

    const jobPost = await prisma.job.findMany({
      where: {
        status: "ACTIVE",
        //todo: remove the jobs which user have already applied
      },
      include: getJobDataIncludeBrowse(),
      take: PAGE_SIZE + 1,
      orderBy: { createdAt: "desc" },
      cursor: cursor ? { id: cursor } : undefined,
    });
    const nextCursor =
      jobPost.length > PAGE_SIZE ? jobPost[PAGE_SIZE].id : null;

    const data: JobDataBrowseAPIResponse = {
      message: "Job Fetched Successfully",
      success: true,
      data: {
        nextCursor,
        data: {
          jobs: jobPost.slice(0, PAGE_SIZE),
        },
      },
    };
    return Response.json(data);
  } catch (error) {
    console.error("browse jobs", error);

    return Response.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
};
