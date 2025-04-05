"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import { revalidatePath } from "next/cache";

interface DeleteMockInterviewParams {
  interviewId: string;
}
export const deleteMockInterview = async ({
  interviewId,
}: DeleteMockInterviewParams) => {
  try {
    const session = await auth();
    if (!session || !session.jobSeekerId) {
      throw new Error("Unauthorized");
    }

    const interview = await prisma.mockInterview.findUnique({
      where: {
        id: interviewId,
        userId: session.jobSeekerId,
      },
    });
    if (!interview) {
      throw new Error("Interview not found");
    }
    if (interview.isDeleted) {
      throw new Error("Interview already deleted");
    }

    await prisma.mockInterview.update({
      where: {
        id: interviewId,
        userId: session.jobSeekerId,
      },
      data: {
        isDeleted: true,
        deletedAt: new Date(),
      },
    });
    revalidatePath("/job-seeker/career-coach/mock-interview");
    return { success: true, message: "Interview deleted successfully" };
  } catch (error) {
    return handleError({ error, errorIn: "deleteMockInterview" });
  }
};
