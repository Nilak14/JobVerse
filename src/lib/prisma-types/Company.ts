import { Prisma } from "@prisma/client";

export function getCompanyInclude(employerId: string) {
  return {
    adminEmployer: {
      select: {
        userId: true,
      },
    },
    members: {
      where: {
        employerId: {
          not: employerId,
        },
        isDeleted: false,
      },
      select: {
        employer: {
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
      },
    },
  } satisfies Prisma.CompanyInclude;
}

export type CompanyInclude = Prisma.CompanyGetPayload<{
  include: ReturnType<typeof getCompanyInclude>;
}>;
