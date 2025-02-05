import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { JobDateInclude } from "@/lib/prisma-types/Job";
import "server-only";

export const getJobById = async (jobId: string) => {
  const session = await auth();
  if (!session || !session.activeCompanyId || !session.user) {
    return null;
  }
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
      companyId: session.activeCompanyId,
    },
    include: JobDateInclude,
  });
  return job;
};
