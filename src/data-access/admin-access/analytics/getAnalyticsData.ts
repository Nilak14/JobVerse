import prisma from "@/lib/prisma";
import {
  getCompanyInterview,
  getCompanyRecentPendingApplication,
  getCompanyWithHighestJob,
  getRecentUser,
  RecentPendingApplication,
} from "@/lib/prisma-types/Analytics";
import { cache } from "react";

export const GetRecentUser = cache(async () => {
  const user = await prisma.user.findMany({
    where: {
      userType: {
        not: "ADMIN",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
    select: getRecentUser(),
  });
  return user || [];
});

export const GetCompanyWithHighestJob = cache(async () => {
  const company = await prisma.company.findMany({
    where: {
      isDeleted: false,
    },
    orderBy: {
      jobPosted: {
        _count: "desc",
      },
    },
    take: 5,
    select: getCompanyWithHighestJob(),
  });
  return company || [];
});

export const getCompanyScheduledInterview = cache((companyId: string) => {
  const scheduledInterview = prisma.application.findMany({
    where: {
      job: {
        companyId: companyId,
      },
      status: "INTERVIEW",
    },
    select: getCompanyInterview(),
  });
  return scheduledInterview || [];
});

export const getRecentPendingApplication = cache(
  (companyId: string): Promise<RecentPendingApplication[]> => {
    const pendingApplication = prisma.application.findMany({
      where: {
        job: {
          companyId: companyId,
        },
        status: "PENDING",
      },
      select: getCompanyRecentPendingApplication(),
    });
    return pendingApplication || [];
  }
);
