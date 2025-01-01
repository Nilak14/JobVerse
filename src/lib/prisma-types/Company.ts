import { Prisma } from "@prisma/client";

export function getCompanyInclude(companyId: string, userId: string) {
  return {
    adminEmployer: {
      select: {
        userId: true,
      },
    },
    employers: {
      where: {
        NOT: {
          userId,
        },
      },
      select: {
        id: true,
        user: {
          select: {
            image: true,
            name: true,
            email: true,
            id: true,
          },
        },
      },
    },
  } satisfies Prisma.CompanyInclude;
}

export type CompanyInclude = Prisma.CompanyGetPayload<{
  include: ReturnType<typeof getCompanyInclude>;
}>;
