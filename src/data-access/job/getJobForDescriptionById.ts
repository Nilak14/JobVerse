import prisma from "@/lib/prisma";
import { getJobDataIncludeDescription } from "@/lib/prisma-types/Job";
import { cache } from "react";
import "server-only";

export const getJobByIdDescription = cache(async (jobId: string) => {
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
      status: "ACTIVE",
    },
    select: getJobDataIncludeDescription(),
  });
  return job;
});
