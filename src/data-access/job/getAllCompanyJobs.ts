import prisma from "@/lib/prisma";
import { JobDataInclude } from "@/lib/prisma-types/Job";

export const getAllCompanyJobs = async (companyId: string) => {
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
};
