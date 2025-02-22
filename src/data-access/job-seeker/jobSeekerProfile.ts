import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { cache } from "react";

export const getJobSeekerProfile = cache(async () => {
  const session = await auth();
  if (!session || !session.user || session.user.type !== "JOB_SEEKER") {
    return {};
  }
  const jobSeeker = await prisma.user.findUnique({
    where: {
      id: session.user.id,
      userType: "JOB_SEEKER",
    },
    select: {
      name: true,
      image: true,
      email: true,
      JOB_SEEKER: {
        select: {
          JobSeekerProfile: {
            select: {
              location: true,
              phoneNumber: true,
              designation: true,
              bio: true,
              skills: true,
              WorkExperience: {},
              Education: {},
              Certification: {},
              receiveJobRecommendationEmail: true,
              receiveMarketingEmails: true,
              receiveJobApplicationUpdated: true,
              profileVisibility: true,
            },
          },
        },
      },
    },
  });
});
