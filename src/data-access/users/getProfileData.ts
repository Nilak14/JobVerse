import prisma from "@/lib/prisma";
import { getCompanyProfile } from "@/lib/prisma-types/CompanyProfile";
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

export const getCompanyProfileData = cache(async (companyId: string) => {
  const company = await prisma.company.findUnique({
    where: {
      id: companyId,
      isDeleted: false,
    },
    select: getCompanyProfile(),
  });
  return company;
});
