"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const session = await auth();
    if (!session || !session.activeCompanyId) {
      return Response.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }
    const companyLinkedInStatus = await prisma.linkedInToken.findUnique({
      where: {
        companyId: session.activeCompanyId,
      },
      select: {
        companyId: true,
        accessToken: true,
        expiresAt: true,
      },
    });
    const data = companyLinkedInStatus || null;
    return Response.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
