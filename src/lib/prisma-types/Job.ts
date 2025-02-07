import { Prisma } from "@prisma/client";

export const JobDataInclude = {
  Salary: true,
} satisfies Prisma.JobInclude;

export type JobServerData = Prisma.JobGetPayload<{
  include: typeof JobDataInclude;
}>;
