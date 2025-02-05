import { Prisma } from "@prisma/client";

export const JobDateInclude = {
  Salary: true,
} satisfies Prisma.JobInclude;

export type JobServerData = Prisma.JobGetPayload<{
  include: typeof JobDateInclude;
}>;
