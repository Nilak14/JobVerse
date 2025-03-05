import prisma from "@/lib/prisma";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  const { slug } = await params;
  if (!slug)
    return Response.json(
      { message: "Invalid slug", success: false },
      { status: 400 }
    );
  try {
    const uploadedResume = await prisma.userUploadedResume.findUnique({
      where: { id: slug },
      select: {
        resumeUrl: true,
      },
    });
    if (!uploadedResume)
      return Response.json(
        { message: "Resume not found", success: false },
        { status: 404 }
      );
    return Response.json(
      { data: { resumeUrl: uploadedResume.resumeUrl }, success: true },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
};
