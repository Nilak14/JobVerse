import { Prisma } from "@prisma/client";

export function getCompanyProfile() {
  return {
    id: true,
    name: true,
    logoUrl: true,
    website: true,
    description: true,
    _count: {
      select: {
        jobPosted: true,
      },
    },
  } satisfies Prisma.CompanySelect;
}

export type CompanyProfile = Prisma.CompanyGetPayload<{
  select: ReturnType<typeof getCompanyProfile>;
}>;
