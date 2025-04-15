import { Prisma } from "@prisma/client";

export function getRecentUser() {
  return {
    id: true,
    userType: true,
    email: true,
    image: true,
    name: true,
    createdAt: true,
    emailVerified: true,
  } satisfies Prisma.UserSelect;
}

export type RecentUser = Prisma.UserGetPayload<{
  select: ReturnType<typeof getRecentUser>;
}>;
export function getCompanyWithHighestJob() {
  return {
    id: true,
    name: true,
    logoUrl: true,
    adminEmployer: {
      select: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
      },
    },
    _count: {
      select: {
        jobPosted: true,
        members: {
          where: {
            isDeleted: false,
          },
        },
      },
    },
  } satisfies Prisma.CompanySelect;
}

export type HighestJobCompany = Prisma.CompanyGetPayload<{
  select: ReturnType<typeof getCompanyWithHighestJob>;
}>;

export function getCompanyInterview() {
  return {
    jobSeeker: {
      select: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    },
    Interview: {
      select: {
        interviewDate: true,
        interviewTime: true,
        interviewType: true,
        note: true,
      },
    },
  } satisfies Prisma.ApplicationSelect;
}
export type CompanyInterview = Prisma.ApplicationGetPayload<{
  select: ReturnType<typeof getCompanyInterview>;
}>;

export function getCompanyRecentPendingApplication() {
  return {
    createdAt: true,
    job: {
      select: {
        id: true,
        title: true,
      },
    },
    jobSeeker: {
      select: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    },
  } satisfies Prisma.ApplicationSelect;
}
export type RecentPendingApplication = Prisma.ApplicationGetPayload<{
  select: ReturnType<typeof getCompanyRecentPendingApplication>;
}>;
