import { Prisma } from "@prisma/client";

export function getJobSeekerProfileSelect() {
  return {
    name: true,
    image: true,
    email: true,
    isTwoFactorEnabled: true,
    JOB_SEEKER: {
      select: {
        JobSeekerProfile: {
          select: {
            location: true,
            openToWork: true,
            designation: true,
            bio: true,
            skills: true,
            WorkExperience: {
              select: {
                position: true,
                companyName: true,
                startDate: true,
                endDate: true,
                description: true,
                order: true,
              },
            },
            Education: {
              select: {
                degreeTitle: true,
                instituteName: true,
                instituteLocation: true,
                startDate: true,
                endDate: true,
                order: true,
              },
            },
            Certification: {
              select: {
                title: true,
                completionDate: true,
                instituteName: true,
                order: true,
              },
            },
            receiveJobRecommendationEmail: true,
            receiveMarketingEmails: true,
            receiveJobApplicationUpdated: true,
            profileVisibility: true,
          },
        },
      },
    },
  } satisfies Prisma.UserSelect;
}

export type JobSeekerProfile = Prisma.UserGetPayload<{
  select: ReturnType<typeof getJobSeekerProfileSelect>;
}>;
