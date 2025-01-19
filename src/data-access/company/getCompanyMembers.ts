import "server-only";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { cache } from "react";
import { signOut } from "@/auth";

import { getCompanyMemberInclude } from "@/lib/prisma-types/CompanyMember";

export const getCompanyMembers = cache(async () => {
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

  const members = await prisma.companyMember.findMany({
    where: {
      companyId: session.activeCompanyId,
      isDeleted: false,
    },
    include: getCompanyMemberInclude(),
    orderBy: {
      role: "asc", // To get Admin role first
    },
  });

  return members;
});
