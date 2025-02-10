import { Prisma } from "@prisma/client";

export const JobDataInclude = {
  Salary: true,
  creator: {
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
} satisfies Prisma.JobInclude;

export type JobServerData = Prisma.JobGetPayload<{
  include: typeof JobDataInclude;
}>;

export const JobDataIncludeAdmin = {
  Salary: true,
  company: {
    select: {
      name: true,
      logoUrl: true,
      adminEmployer: {
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
    },
  },
  creator: {
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
} satisfies Prisma.JobInclude;
export type JobServerDataAdmin = Prisma.JobGetPayload<{
  include: typeof JobDataIncludeAdmin;
}>;
