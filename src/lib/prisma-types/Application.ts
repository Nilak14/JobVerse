import { Prisma } from "@prisma/client";

export const JobApplicationSelect = () => {
  return {
    id: true,
    status: true,
    createdAt: true,
    resumeId: true,
    ApplicationReview: {
      select: {
        id: true,
        reviewedAt: true,
        reviewedStatus: true,
      },
    },
    job: {
      select: {
        id: true,
        title: true,
        workMode: true,
        Salary: true,
        jobType: true,
        company: {
          select: {
            name: true,
            logoUrl: true,
          },
        },
      },
    },
  } satisfies Prisma.ApplicationSelect;
};
export type JobApplication = Prisma.ApplicationGetPayload<{
  select: ReturnType<typeof JobApplicationSelect>;
}>;

export const JobApplicationSelectEmployer = () => {
  return {
    id: true,
    status: true,
    createdAt: true,
    resumeId: true,
    job: {
      select: {
        title: true,
        id: true,
      },
    },
    jobSeeker: {
      select: {
        JobSeekerProfile: {
          select: {
            skills: true,
            location: true,
            profileVisibility: true,
          },
        },
        user: {
          select: {
            name: true,
            image: true,
            email: true,
          },
        },
      },
    },
  } satisfies Prisma.ApplicationSelect;
};

export type JobApplicationEmployer = Prisma.ApplicationGetPayload<{
  select: ReturnType<typeof JobApplicationSelectEmployer>;
}>;
