// get all members of company

import { Prisma } from "@prisma/client";

export function getCompanyMemberInclude() {
  return {
    employer: {
      include: {
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
  } satisfies Prisma.CompanyMemberInclude;
}

export type CompanyMemberType = Prisma.CompanyMemberGetPayload<{
  include: ReturnType<typeof getCompanyMemberInclude>;
}>[];
