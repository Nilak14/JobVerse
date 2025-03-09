import prisma from "@/lib/prisma";
import { ResumeDataInclude } from "@/lib/prisma-types/Resume";
import { cache } from "react";
import { getJobSeekerSubscriptionLevel } from "../subscription/jobseekerSubscription";

export const getUserAllCreatedResume = cache(
  async (jobSeekerId: string, userId: string) => {
    const [resumes, resumeCount, subscriptionLevel] = await Promise.all([
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
      getJobSeekerSubscriptionLevel(userId),
    ]);
    return [resumes, resumeCount, subscriptionLevel] as const;
  }
);
