import prisma from "@/lib/prisma";
import { ResumeDataInclude } from "@/lib/prisma-types/Resume";
import { cache } from "react";

export const getUserAllCreatedResume = cache(async (jobSeekerId: string) => {
  const [resumes, resumeCount] = await Promise.all([
    prisma.resume.findMany({
      where: {
        userId: jobSeekerId,
      },
      include: ResumeDataInclude,
      orderBy: {
        updatedAt: "desc",
      },
    }),
    prisma.resume.count({
      where: {
        userId: jobSeekerId,
      },
    }),
  ]);
  return [resumes, resumeCount] as const;
});
