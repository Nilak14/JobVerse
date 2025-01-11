import { Prisma } from "@prisma/client";

// get Employer Companies-----------------------------------------------------------
// export function getEmployerCompanies() {
//   return {
//     members:{

//     }
//   } satisfies Prisma.CompanyInclude;
// }

export type EmployerCompany = Prisma.CompanyGetPayload<{}>;

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

// // get Company All Employer

// export function getCompanyEmployerInclude(companyId: string) {
//   return {
//     user: {
//       select: {
//         name: true,
//         email: true,
//         image: true,
//       },
//     },

//     receivedInvitations: {
//       where: {
//         status: "ACCEPTED",
//         companyId: companyId,
//       },
//       take: 1,
//       select: {
//         inviter: {
//           select: {
//             user: {
//               select: {
//                 name: true,
//                 image: true,
//               },
//             },
//           },
//         },
//       },
//     },
//   } satisfies Prisma.EmployerInclude;
// }

// export type CompanyEmployer = Prisma.EmployerGetPayload<{
//   include: ReturnType<typeof getCompanyEmployerInclude>;
// }>;
