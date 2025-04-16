import prisma from "@/lib/prisma";
import { getJobDataIncludeBrowse } from "@/lib/prisma-types/Job";
import { cache } from "react";

export const getRecommendedJob = cache(async (jobSeekerId: string) => {
  const jobSeeker = await prisma.jobSeekerProfile.findFirst({
    where: {
      userId: jobSeekerId,
    },
    select: {
      skills: true,
    },
  });

  if (!jobSeeker) return [];

  const normalizedSkills = jobSeeker.skills.map((skill) => skill.toLowerCase());

  const recommendedJobs = await prisma.job.findMany({
    where: {
      status: "ACTIVE",
      OR: [
        {
          skills: {
            hasSome: normalizedSkills,
          },
        },
        {
          tags: {
            hasSome: normalizedSkills,
          },
        },
      ],
    },
    take: 20,
    select: getJobDataIncludeBrowse(),

    orderBy: {
      createdAt: "desc",
    },
  });

  return recommendedJobs || [];
});
