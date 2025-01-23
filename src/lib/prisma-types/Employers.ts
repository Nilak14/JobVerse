import { Prisma } from "@prisma/client";

// get Employer Companies--------------------------------------------------------

export function OmitEmployerCompanies() {
  return {
    isDeleted: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  } satisfies Prisma.CompanyOmit;
}

export type EmployerCompany = Prisma.CompanyGetPayload<{
  omit: ReturnType<typeof OmitEmployerCompanies>;
}>;

export type EmployerCompaniesResponse = {
  success: boolean;
  message: string;
  data: {
    companies: EmployerCompany[];
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
        companyMemberships: true,
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
