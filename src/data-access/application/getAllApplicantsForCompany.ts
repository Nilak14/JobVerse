import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { JobApplicationSelectEmployer } from "@/lib/prisma-types/Application";

export const getAllApplicantsForCompany = async () => {
  const session = await auth();
  if (!session || !session.user || !session.activeCompanyId) {
    return null;
  }
  const applicants = await prisma.application.findMany({
    where: {
      job: {
        companyId: session.activeCompanyId,
      },
    },
    select: JobApplicationSelectEmployer(),
  });
  return applicants;
};
