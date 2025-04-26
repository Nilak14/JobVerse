import prisma from "@/lib/prisma";
import {
  getJobDataIncludeBrowse,
  JobDataBrowse,
  JobDataBrowseAPIResponse,
} from "@/lib/prisma-types/Job";
import { NextRequest } from "next/server";

type Params = Promise<{ companyId: string }>;
export const GET = async (
  req: NextRequest,
  segmentData: { params: Params }
) => {
  try {
    const params = await segmentData.params;
    const companyId = params.companyId;
    const url = req.nextUrl;
    const cursor = url.searchParams.get("cursor") || undefined;
    const PAGE_SIZE = 10 as const;

    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
        isDeleted: false,
      },
      select: {
        id: true,
      },
    });
    if (!company) {
      return Response.json(
        { success: false, message: "Company not found" },
        { status: 404 }
      );
    }

    const companyJobPost = await prisma.job.findMany({
      where: {
        companyId: companyId,
        status: {
          in: ["ACTIVE", "EXPIRED"],
        },
      },
      select: getJobDataIncludeBrowse(),
      take: PAGE_SIZE + 1,
      orderBy: { createdAt: "desc" },
      cursor: cursor ? { id: cursor } : undefined,
    });
    const nextCursor =
      companyJobPost.length > PAGE_SIZE ? companyJobPost[PAGE_SIZE].id : null;

    const data: JobDataBrowseAPIResponse = {
      message: "Job Fetched Successfully",
      success: true,
      data: {
        nextCursor,
        data: {
          jobs: companyJobPost.slice(0, PAGE_SIZE),
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
