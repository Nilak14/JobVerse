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
        NOT: {
          employerId,
        },
      },
      select: {
        employer: {
          select: {
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
