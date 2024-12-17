import { auth } from "@/auth";
import prisma from "@/lib/prisma";
import {
  EmployerSearchResponse,
  getEmployerSearch,
} from "@/lib/prisma-types/Employers";
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
    if (session.user.type === "JOB_SEEKER") {
      return new Response(
        JSON.stringify({
          message: "Forbidden: You are not authorized to access this resource",
        }),
        { status: 403 }
      );
    }
    const searchParam = req.nextUrl.searchParams.get("search");
    if (!searchParam) {
      return Response.json(
        { success: false, message: "Search parameter is required" },
        { status: 400 }
      );
    }
    const user = await prisma.user.findMany({
      where: {
        NOT: {
          id: session.user.id,
        },
        AND: [
          { userType: "EMPLOYER" },
          {
            OR: [
              { name: { contains: searchParam, mode: "insensitive" } },
              { email: { contains: searchParam, mode: "insensitive" } },
            ],
          },
        ],
      },
      select: getEmployerSearch(),
    });

    const data: EmployerSearchResponse = {
      data: {
        employers: user,
      },
      message: "Employer search results fetched successfully",
      success: true,
    };

    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json({ success: false, message: error }, { status: 500 });
  }
};
