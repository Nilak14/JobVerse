import { JobStatus, Prisma } from "@prisma/client";

export function getCompanyProfile() {
  return {
    id: true,
    name: true,
    logoUrl: true,
    followers: {
      select: {
        jobSeekerId: true,
      },
    },
    website: true,
    description: true,
    _count: {
      select: {
        jobPosted: {
          where: {
            status: {
              in: [JobStatus.ACTIVE, JobStatus.EXPIRED],
            },
          },
        },
        followers: true,
      },
    },
  } satisfies Prisma.CompanySelect;
}

export type CompanyProfile = Prisma.CompanyGetPayload<{
  select: ReturnType<typeof getCompanyProfile>;
}>;
