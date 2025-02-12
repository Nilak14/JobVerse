import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { JobDataIncludeAdmin } from "@/lib/prisma-types/Job";
import { cache } from "react";

export const getAllJobs = cache(async () => {
  const session = await auth();
  if (!session || !session.user || session.user.type !== "ADMIN") return [];

  const allJobs = await prisma.job.findMany({
    include: JobDataIncludeAdmin,
    orderBy: {
      createdAt: "desc",
    },
  });
  return allJobs;
});
