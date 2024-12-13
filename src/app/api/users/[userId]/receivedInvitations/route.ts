import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) => {
  const { userId } = await params;
  try {
    const session = await auth();

    if (!session || !session.user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    if (session.user.isBlocked) {
      return Response.json({ message: "Blocked" }, { status: 403 });
    }

    const userInvitations = await prisma.employer.findUnique({
      where: {
        userId: userId,
      },
      include: {
        receivedInvitations: {
          include: {
            company: true,
            invitee: {
              select: {
                user: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    return Response.json(
      { success: true, data: userInvitations || [] },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ success: false, message: error }, { status: 500 });
  }
};
