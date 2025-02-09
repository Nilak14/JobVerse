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
