import { Prisma } from "@prisma/client";

// all pending invitations of an employer
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
