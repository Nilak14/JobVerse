import prisma from "@/lib/prisma";
import { JobDataInclude } from "@/lib/prisma-types/Job";

export const getAllCompanyJobs = async (companyId: string) => {
  const allJobs = await prisma.job.findMany({
    where: {
      companyId,
    },
    include: JobDataInclude,
  });
  return allJobs;
};
