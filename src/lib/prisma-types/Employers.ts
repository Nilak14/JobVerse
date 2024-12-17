import { Prisma } from "@prisma/client";

// get Employer Companies-----------------------------------------------------------
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
  message: string;
  data: {
    companies: EmployerCompanies["companies"];
  };
};

// get Employer Search Result-----------------------------------------------------------
export function getEmployerSearch() {
  return {
    id: true,
    name: true,
    email: true,
    image: true,

    EMPLOYER: {
      select: {
        id: true,
      },
    },
  } satisfies Prisma.UserSelect;
}

export type EmployerSearch = Prisma.UserGetPayload<{
  select: ReturnType<typeof getEmployerSearch>;
}>;

export type EmployerSearchResponse = {
  success: boolean;
  message: string;
  data: {
    employers: EmployerSearch[];
  };
};
