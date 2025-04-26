import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { FollowerResponse } from "@/lib/prisma-types/Company";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  try {
    const companyId = (await params).slug;
    const session = await auth();
    if (!session || !session.jobSeekerId) {
      return Response.json(
        { success: false, message: "Unauthorized Request" },
        { status: 401 }
      );
    }
    const company = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
      select: {
        followers: {
          where: {
            jobSeekerId: session.jobSeekerId,
          },
          select: {
            jobSeekerId: true,
          },
        },
        _count: {
          select: {
            followers: true,
          },
        },
      },
    });
    if (!company) {
      return Response.json(
        { success: false, message: "Company not found" },
        { status: 404 }
      );
    }
    const data: FollowerResponse = {
      success: true,
      message: "Followed Success",
      data: {
        data: {
          followers: company._count.followers,
          isFollowedByUser: !!company.followers.length,
        },
      },
    };
    return Response.json(data, { status: 200 });
  } catch (error) {
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  try {
    const session = await auth();
    const companyId = (await params).slug;
    if (!session || !session.jobSeekerId) {
      return Response.json(
        { success: false, message: "Unauthorized Request" },
        { status: 401 }
      );
    }
    await prisma.follow.upsert({
      where: {
        jobSeekerId_companyId: {
          jobSeekerId: session.jobSeekerId,
          companyId: companyId,
        },
      },
      create: {
        jobSeekerId: session.jobSeekerId,
        companyId: companyId,
      },
      update: {},
    });
    return Response.json({
      success: true,
      message: "Company Followed Successfully",
    });
  } catch (error) {
    return Response.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) => {
  try {
    const session = await auth();
    const companyId = (await params).slug;
    if (!session || !session.jobSeekerId) {
      return Response.json(
        { success: false, message: "Unauthorized Request" },
        { status: 401 }
      );
    }
    await prisma.follow.deleteMany({
      where: {
        jobSeekerId: session.jobSeekerId,
        companyId: companyId,
      },
    });
    return Response.json({
      success: true,
      message: "Company UnFollowed Successfully",
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
};
