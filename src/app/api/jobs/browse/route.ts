import prisma from "@/lib/prisma";
import {
  getJobDataIncludeBrowse,
  JobDataBrowseAPIResponse,
} from "@/lib/prisma-types/Job";
import { Prisma } from "@prisma/client";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const url = req.nextUrl;
    const cursor = url.searchParams.get("cursor") || undefined;
    const PAGE_SIZE = 10 as const;

    //todo: not sure it user need to be authenticated to browse jobs or not

    // retrieve filter status
    const workModeParams = url.searchParams.get("workMode") || "";
    const jobTypesParams = url.searchParams.get("jobTypes") || "";
    const experienceLevelParams = url.searchParams.get("experienceLevel") || "";
    const globalSearchParams = url.searchParams.get("globalSearch") || "";
    const companySearchParams = url.searchParams.get("companySearch") || "";
    const locationSearchParams = url.searchParams.get("locationSearch") || "";

    const globalSearch = globalSearchParams
      .split(" ")
      .filter((word) => word.length > 0)
      .map((word) => word.toLowerCase())
      .join(" & ");

    // transform experience level params
    // frontend sends as "0,1-3,3-5,5+"
    // db has exp as "0","1","2","3","4","5"
    let expLevelFilter: string[] | undefined = undefined;
    if (experienceLevelParams) {
      const selections = experienceLevelParams.split(",");
      const allowedLevels: string[] = [];
      for (const selection of selections) {
        if (selection === "0") {
          allowedLevels.push("0");
        }
        if (selection === "1-3") {
          allowedLevels.push("1", "2", "3");
        }
        if (selection === "3-5") {
          allowedLevels.push("3", "4", "5");
        }
        if (selection === "5+") {
          allowedLevels.push("5");
        }
      }
      // remove duplicates
      expLevelFilter = Array.from(new Set(allowedLevels));
    }

    const searchFilter: Prisma.JobWhereInput = globalSearch
      ? {
          OR: [
            { title: { search: globalSearch, mode: "insensitive" } },
            { description: { search: globalSearch, mode: "insensitive" } },
            { tags: { hasSome: globalSearch.split(" ") } },
            { skills: { hasSome: globalSearch.split(" ") } },
          ],
        }
      : {};

    const where: Prisma.JobWhereInput = {
      status: "ACTIVE",
      AND: [
        searchFilter,
        workModeParams
          ? { workMode: { in: workModeParams.split(","), mode: "insensitive" } }
          : {},
        jobTypesParams
          ? { jobType: { in: jobTypesParams.split(","), mode: "insensitive" } }
          : {},
        expLevelFilter
          ? { experienceLevel: { in: expLevelFilter, mode: "insensitive" } }
          : {},
        companySearchParams
          ? {
              company: {
                name: { contains: companySearchParams, mode: "insensitive" },
              },
            }
          : {},
        locationSearchParams
          ? {
              location: { contains: locationSearchParams, mode: "insensitive" },
            }
          : {},
      ],
    };

    const jobPost = await prisma.job.findMany({
      where,
      //todo: remove the jobs which user have already applied
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
