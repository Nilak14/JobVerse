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
    const companyId = req.nextUrl.searchParams.get("CID");

    if (!searchParam) {
      return Response.json(
        { success: false, message: "Search parameter is required" },
        { status: 400 }
      );
    }
    if (!companyId) {
      return Response.json(
        { success: false, message: "Company Id is required" },
        { status: 400 }
      );
    }

    // check company exist or not at first
    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
      include: {
        members: true,
      },
    });
    if (!company) {
      return Response.json(
        { success: false, message: "Company not found" },
        { status: 404 }
      );
    }

    const user = await prisma.user.findMany({
      where: {
        NOT: {
          // do not include the user itself
          id: session.user.id,
        },
        AND: [
          // get only the user with type employer
          { userType: "EMPLOYER" },
          {
            OR: [
              // match with email or name
              { name: { contains: searchParam, mode: "insensitive" } },
              { email: { contains: searchParam, mode: "insensitive" } },
            ],
          },
          {
            EMPLOYER: {
              AND: [
                {
                  companyMemberships: {
                    none: {
                      // exclude the employer who already are already in that company
                      id: companyId,
                    },
                  },
                  receivedInvitations: {
                    // exclude the employer who already have pending or accepted invitation for that company
                    none: {
                      AND: [
                        { companyId: companyId },
                        {
                          status: {
                            in: ["PENDING"],
                          },
                        },
                      ],
                    },
                  },
                },
              ],
            },
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
