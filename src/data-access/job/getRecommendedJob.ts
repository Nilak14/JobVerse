import prisma from "@/lib/prisma";
import { getJobDataIncludeBrowse } from "@/lib/prisma-types/Job";
import { cache } from "react";

export const getRecommendedJob = cache(async (jobSeekerId: string) => {
  const jobSeeker = await prisma.jOB_SEEKER.findFirst({
    where: {
      id: jobSeekerId,
    },
    select: {
      followedCompany: {
        select: {
          id: true,
        },
      },
      JobSeekerProfile: {
        select: {
          skills: true,
        },
      },
    },
  });

  if (!jobSeeker) return [];

  const normalizedSkills = jobSeeker.JobSeekerProfile?.skills.map((skill) =>
    skill.toLowerCase()
  );

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
        {
          companyId: {
            in: jobSeeker.followedCompany.map((company) => company.id),
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
