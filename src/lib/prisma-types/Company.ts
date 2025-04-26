import { Prisma } from "@prisma/client";

export function getCompanyInclude(employerId: string) {
  return {
    adminEmployer: {
      select: {
        userId: true,
      },
    },
    members: {
      where: {
        employerId: {
          not: employerId,
        },
        isDeleted: false,
      },
      select: {
        employer: {
          select: {
            id: true,
            user: {
              select: {
                image: true,
                name: true,
                email: true,
                id: true,
              },
            },
          },
        },
      },
    },
  } satisfies Prisma.CompanyInclude;
}

export type CompanyInclude = Prisma.CompanyGetPayload<{
  include: ReturnType<typeof getCompanyInclude>;
}>;

export const getAllCompanyInclude = () => {
  return {
    adminEmployer: {
      select: {
        userId: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    },
    subscriptions: true,

    _count: {
      select: {
        members: true,
        jobPosted: true,
      },
    },
  } satisfies Prisma.CompanyInclude;
};
export type AllCompanyInclude = Prisma.CompanyGetPayload<{
  include: ReturnType<typeof getAllCompanyInclude>;
}>;

export type FollowerInfo = {
  followers: number;
  isFollowedByUser: boolean;
};

export type FollowerResponse = {
  success: boolean;
  message: string;
  data?: {
    data: FollowerInfo;
  };
};
