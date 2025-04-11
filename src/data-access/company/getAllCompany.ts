import prisma from "@/lib/prisma";
import { getAllCompanyInclude } from "@/lib/prisma-types/Company";
import { cache } from "react";

export const getAllCompany = cache(async () => {
  const company = await prisma.company.findMany({
    include: getAllCompanyInclude(),
  });
  return company || [];
});
