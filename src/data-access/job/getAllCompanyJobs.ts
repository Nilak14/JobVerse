import prisma from "@/lib/prisma";
import {
  getJobDataIncludeBrowse,
  JobDataInclude,
} from "@/lib/prisma-types/Job";
import { cache } from "react";

export const getAllCompanyJobs = cache(async (companyId: string) => {
  const allJobs = await prisma.job.findMany({
    where: {
      companyId,
      isDeleted: false,
    },
    include: JobDataInclude,

    orderBy: {
      createdAt: "desc",
    },
  });
  return allJobs;
});

export const getAllCompanyActiveJobs = cache(async (companyId: string) => {
  const allJobs = await prisma.job.findMany({
    where: {
      companyId,
      isDeleted: false,
      status: "ACTIVE",
    },
    select: getJobDataIncludeBrowse(),
    orderBy: {
      createdAt: "desc",
    },
  });
  return allJobs;
});
