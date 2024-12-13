import { Prisma } from "@prisma/client";

export function getEmployerCompanies() {
  return {
    companies: {
      select: {
        id: true,
        name: true,
        description: true,
        website: true,
        logoUrl: true,
      },
    },
  } satisfies Prisma.EmployerInclude;
}

export type EmployerCompanies = Prisma.EmployerGetPayload<{
  include: ReturnType<typeof getEmployerCompanies>;
}>;

export type EmployerCompaniesResponse = {
  success: boolean;
  data: {
    companies: EmployerCompanies["companies"];
  };
};
