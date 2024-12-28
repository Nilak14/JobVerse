import { auth } from "@/auth";
import prisma from "@/lib/prisma";

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
    const companyId = req.nextUrl.searchParams.get("CID");

    if (!companyId) {
      return Response.json(
        { success: false, message: "Company Id is required" },
        { status: 400 }
      );
    }

    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
      include: {
        employers: true,
      },
    });
    if (!company) {
      return Response.json(
        { success: false, message: "Company not found" },
        { status: 404 }
      );
    }
    let page = req.nextUrl.searchParams.get("page") || "1";
    let pageSize = req.nextUrl.searchParams.get("pageSize") || "5";
    let search = req.nextUrl.searchParams.get("search") || "";
    const pageIndex = parseInt(page) - 1;
    const limit = parseInt(pageSize, 10);

    const [employee, totalEmployee] = await Promise.all([
      await prisma.employer.findMany({
        where: {
          companies: {
            some: {
              id: companyId,
            },
          },
          user: {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
            ],
          },
        },
        skip: pageIndex * limit,
        take: limit,
        include: {
          user: {
            select: {
              name: true,
              email: true,
            },
          },
        },
      }),
      await prisma.employer.count({
        where: {
          companies: {
            some: {
              id: companyId,
            },
          },
          user: {
            OR: [
              { name: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
            ],
          },
        },
      }),
    ]);

    const data = {
      data: employee,
      meta: {
        total: totalEmployee,
        page: parseInt(page),
        pageSize: limit,
        totalPages: Math.ceil(totalEmployee / limit),
      },
    };

    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json({ success: false, message: error }, { status: 500 });
  }
};
