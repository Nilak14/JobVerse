import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  EmployerCompaniesResponse,
  OmitEmployerCompanies,
} from "@/lib/prisma-types/Employers";

import { NextRequest } from "next/server";

// route to get all companies of the employer
export const GET = async (req: NextRequest) => {
  try {
    const session = await auth();

    if (!session || !session.user) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (session.user.isBlocked) {
      return Response.json({ message: "Blocked" }, { status: 403 });
    }

    const employer = await prisma.employer.findUnique({
      where: { userId: session.user.id },
    });

    if (!employer) {
      return Response.json(
        { message: "No employer record found for the user." },
        { status: 403 }
      );
    }

    const EmployerCompanies = await prisma.company.findMany({
      where: {
        isDeleted: false,
        members: {
          some: {
            isDeleted: false,
            employer: {
              id: employer.id,
            },
          },
        },
      },
      omit: OmitEmployerCompanies(),
    });

    const responseData: EmployerCompaniesResponse = {
      success: true,
      message: "Companies fetched successfully",
      data: {
        companies: EmployerCompanies,
      },
    };
    return Response.json(responseData, { status: 200 });
  } catch (error) {
    console.error("Error fetching companies:", error);
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
