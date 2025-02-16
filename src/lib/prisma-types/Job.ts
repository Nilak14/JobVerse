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

export function getJobDataIncludeBrowse() {
  return {
    Salary: true,
    company: {
      select: {
        name: true,
        logoUrl: true,
      },
    },
    category: true,
    subcategory: true,
    id: true,
    title: true,
    workMode: true,
    jobType: true,
    location: true,
    createdAt: true,
  } satisfies Prisma.JobSelect;
}

export type JobDataBrowse = Prisma.JobGetPayload<{
  select: ReturnType<typeof getJobDataIncludeBrowse>;
}>;

export type JobDataBrowseAPIResponse = {
  success: boolean;
  message: string;
  data?: {
    nextCursor: string | null;
    data: {
      jobs: JobDataBrowse[];
    };
  };
};
