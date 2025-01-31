import prisma from "@/lib/prisma";
import { cache } from "react";
import "server-only";

export const getJobById = cache(async (id: string) => {
  const job = await prisma.job.findUnique({
    where: {
      id,
    },
  });
  return job;
});
