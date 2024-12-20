import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  EmployerPendingInvitationsResponse,
  getEmployerPendingInvitations,
} from "@/lib/prisma-types/Invitations";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session || !session.user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (session.user.isBlocked) {
      return Response.json({ message: "Blocked" }, { status: 403 });
    }

    const { employerPendingInvitations } = await prisma.$transaction(
      async (prisma) => {
        const employer = await prisma.employer.findUnique({
          where: {
            userId: session.user.id,
          },
        });
        if (!employer) {
          throw new Error("Employer Not Found");
        }
        const employerPendingInvitations = await prisma.invitations.findMany({
          where: {
            inviteeId: employer.id,
          },
          include: getEmployerPendingInvitations(),
        });
        return { employerPendingInvitations };
      }
    );

    const data: EmployerPendingInvitationsResponse = {
      success: true,
      data: {
        invitations: employerPendingInvitations,
      },
      message: "Invitations fetched successfully",
    };

    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
