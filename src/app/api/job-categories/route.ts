import prisma from "@/lib/prisma";
import { getJobCategoryInclude } from "@/lib/prisma-types/JobCategory";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const category = await prisma.jobCategory.findMany({
      include: getJobCategoryInclude(),
      omit: {
        createdAt: true,
      },
    });
    const data = {
      success: true,
      data: {
        category: category,
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
