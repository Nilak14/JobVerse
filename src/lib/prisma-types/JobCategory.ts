import { Prisma } from "@prisma/client";

export function getJobCategoryInclude() {
  return {
    subcategories: true,
  } satisfies Prisma.JobCategoryInclude;
}

export type JobCategoryInclude = Prisma.JobCategoryGetPayload<{
  include: ReturnType<typeof getJobCategoryInclude>;
}>;
