import { Prisma } from "@prisma/client";

export const JobDataInclude = {
  Salary: true,
  _count: {
    select: {
      applications: true,
    },
  },
  review: {
    select: {
      reviewedComment: true,
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

export type JobServerData = Prisma.JobGetPayload<{
  include: typeof JobDataInclude;
}>;

export const JobDataIncludeAdmin = {
  _count: {
    select: {
      applications: true,
    },
  },
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
        id: true,
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
    isUrgent: true,
    deadline: true,
    saved: true,
    resumeRequired: true,
    experienceLevel: true,
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

export function getJobDataIncludeDescription() {
  return {
    id: true,
    status: true,
    title: true,
    description: true,
    location: true,
    createdAt: true,
    deadline: true,
    workMode: true,
    jobType: true,
    isUrgent: true,
    benefits: true,
    experienceLevel: true,
    licenseRequired: true,
    vehicleRequired: true,
    minEducationRequired: true,
    preferredGender: true,
    resumeRequired: true,
    skills: true,
    totalHeads: true,
    company: {
      select: {
        id: true,
        name: true,
        logoUrl: true,
      },
    },
    Salary: {
      select: {
        maxAmount: true,
        minAmount: true,
        currency: true,
        type: true,
        amount: true,
        rate: true,
      },
    },
    saved: true,
  } satisfies Prisma.JobSelect;
}

export type JobDataDescription = Prisma.JobGetPayload<{
  select: ReturnType<typeof getJobDataIncludeDescription>;
}>;
