import prisma from "@/lib/prisma";
import { getJobSeekerProfileSelect } from "@/lib/prisma-types/JobSeekerProfile";
import { cache } from "react";

export const getJobSeekerProfileData = cache(async (userId: string) => {
  const jobSeeker = await prisma.user.findUnique({
    where: {
      id: userId,
      userType: "JOB_SEEKER",
    },
    select: getJobSeekerProfileSelect(),
  });
  return jobSeeker;
});
