import prisma from "@/lib/prisma";
import { cache } from "react";
import "server-only";

export const getJobByIdDescription = cache(async (jobId: string) => {
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
      status: "ACTIVE",
    },
    include: {
      company: {
        select: {
          id: true,
          name: true,
          logoUrl: true,
        },
      },
    },
  });
  return job;
});
