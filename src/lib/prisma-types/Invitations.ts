import { Prisma } from "@prisma/client";

export function getEmployerPendingInvitations() {
  return {
    company: {
      select: {
        logoUrl: true,
        name: true,
      },
    },
    inviter: {
      include: {
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    },
  } satisfies Prisma.InvitationsInclude;
}

export type EmployerPendingInvitations = Prisma.InvitationsGetPayload<{
  include: ReturnType<typeof getEmployerPendingInvitations>;
}>;

export type EmployerPendingInvitationsResponse = {
  success: boolean;
  message: string;
  data: {
    invitations: EmployerPendingInvitations[];
  };
};
