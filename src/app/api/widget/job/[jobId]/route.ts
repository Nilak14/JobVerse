import { getCompanySubscriptionLevel } from "@/data-access/subscription/companySubscription";
import prisma from "@/lib/prisma";
import { getJobDataIncludeBrowse } from "@/lib/prisma-types/Job";
import { NextRequest, NextResponse } from "next/server";

// Handle preflight requests
export const OPTIONS = () => {
  const res = new NextResponse(null, { status: 200 });
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return res;
};

export const GET = async (
  req: NextRequest,
  { params }: { params: { jobId: string } }
) => {
  try {
    const { jobId } = await params;
    if (!jobId) {
      const res = NextResponse.json(
        { error: "Job ID is required" },
        { status: 400 }
      );
      res.headers.set("Access-Control-Allow-Origin", "*");
      return res;
    }
    const job = await prisma.job.findUnique({
      where: {
        id: jobId,
        isDeleted: false,
        status: "ACTIVE",
      },
      select: getJobDataIncludeBrowse(),
    });
    if (!job || !job.company.id) {
      const res = NextResponse.json(
        { error: "Job Not Found" },
        { status: 400 }
      );
      res.headers.set("Access-Control-Allow-Origin", "*");
      return res;
    }
    const sub = await getCompanySubscriptionLevel(job?.company.id!);

    const data = {
      job,
      subscription: sub,
    };

    const res = NextResponse.json(data, { status: 200 });
    res.headers.set("Access-Control-Allow-Origin", "*");
    return res;
  } catch (error) {
    const res = NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
    res.headers.set("Access-Control-Allow-Origin", "*");
    return res;
  }
};
