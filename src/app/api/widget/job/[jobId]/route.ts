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
    // Sample job data. Replace with your actual logic.
    const job = {
      id: jobId,
      title: "Software Engineer",
      description: "We are looking for a software engineer",
      location: "Remote",
      salary: 100000,
      company: "Google",
    };
    const res = NextResponse.json(job, { status: 200 });
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
