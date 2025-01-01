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

  const data = await prisma.employer.findMany({
    where: {
      companies: {
        some: {
          id: session.activeCompanyId,
        },
      },
    },
    include: getCompanyEmployerInclude(session.activeCompanyId),
  });
  const transformedData = data.map((entry) => ({
    user: {
      email: entry.user.email,
      name: entry.user.name,
      image: entry.user.image,
    },
    invitedBy:
      entry.receivedInvitations.length > 0
        ? {
            name: entry.receivedInvitations[0].inviter.user.name,
            image: entry.receivedInvitations[0].inviter.user.image,
          }
        : {
            name: "Admin",
            image: "",
          }, // If no invitations exist and user is in that company then user is admin of the company
  }));
  return transformedData;
});

export type CompanyEmployerTableData = Awaited<
  ReturnType<typeof getCompanyEmployer>
>;
