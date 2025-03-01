import { Prisma } from "@prisma/client";

export const JobApplicationSelect = () => {
  return {
    id: true,
    status: true,
    createdAt: true,
    resumeId: true,
    job: {
      select: {
        id: true,
        title: true,
        workMode: true,
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
