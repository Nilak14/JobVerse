import "server-only";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { cache } from "react";
import { signOut } from "@/auth";

import { getCompanyEmployerInclude } from "@/lib/prisma-types/Employers";

export const getCompanyEmployer = cache(async () => {
  const session = await auth();
  if (!session || !session.user) {
    signOut();
    return [];
  }
  if (session.user.isBlocked) {
    signOut();
    return [];
  }
  if (session.user.type === "JOB_SEEKER") {
    signOut();
    return [];
  }
  if (!session.activeCompanyId) {
    return [];
  }

  return await prisma.employer.findMany({
    where: {
      companies: {
        some: {
          id: session.activeCompanyId,
        },
      },
    },
    include: getCompanyEmployerInclude(),
  });
});
