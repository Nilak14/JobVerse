// "use server";

// import prisma from "@/lib/prisma";
// import { createSafeActionClient } from "next-safe-action";
// import { z } from "zod";

// const action = createSafeActionClient();

// export const leaveCompany = action
//   .schema(z.object({ userId: z.string(), companyId: z.string() }))
//   .action(async ({ parsedInput: { companyId, userId } }) => {
//     try {
//       const [employer, company] = await Promise.all([
//         prisma.employer.findUnique({
//           where: {
//             userId,
//           },
//           include: {
//             companies: true,
//             adminCompanies: true,
//           },
//         }),
//         prisma.company.findUnique({
//           where: {
//             id: companyId,
//           },
//         }),
//       ]);

//       if (!employer) {
//         return { success: false, message: "User not found" };
//       }
//       if (!company) {
//         return { success: false, message: "Company not found" };
//       }

//       const isUserAdmin = employer.adminCompanies.some(
//         (c) => c.id === companyId
//       );
//       const isUserMember = employer.companies.some((c) => c.id === companyId);

//       // company admin cannot leave the company

//       if (isUserAdmin) {
//         return { success: false, message: "Admin cannot leave the company" };
//       }
//       // user is not a member of the company
//       if (!isUserMember) {
//         return {
//           success: false,
//           message: "User is not a member of the company",
//         };
//       }
//       console.log("hello");

//       const updatedEmployer = await prisma.employer.update({
//         where: {
//           id: employer.id,
//         },
//         data: {
//           companies: {
//             disconnect: {
//               id: companyId,
//             },
//           },

//           activeCompanyId:
//             employer.activeCompanyId === companyId
//               ? null
//               : employer.activeCompanyId,
//         },
//       });
//       console.log(updatedEmployer);

//       return { success: true, message: `You left ${company.name}` };
//     } catch (error) {
//       console.log(error);

//       return { success: false, message: "Something went wrong" };
//     }
//   });
