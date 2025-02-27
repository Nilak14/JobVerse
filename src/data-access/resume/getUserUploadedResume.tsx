import prisma from "@/lib/prisma";
import { cache } from "react";

export const getUserUploadedResume = cache(async (jobSeekerId: string) => {
  const [resumes, resumeCount] = await Promise.all([
    prisma.userUploadedResume.findMany({
      where: {
        userId: jobSeekerId,
      },
    }),
    prisma.userUploadedResume.count({
      where: {
        userId: jobSeekerId,
      },
    }),
  ]);
  return [resumes, resumeCount] as const;
});
