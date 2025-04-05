import prisma from "@/lib/prisma";
import {
  getMockInterviewFeedbackData,
  MockInterviewFeedbackData,
} from "@/lib/prisma-types/MockInterview";
import { cache } from "react";

interface MockInterviewFeedbackParams {
  interviewId: string;
  userId: string;
}

export const getInterviewFeedback = cache(
  async ({
    interviewId,
    userId,
  }: MockInterviewFeedbackParams): Promise<MockInterviewFeedbackData | null> => {
    const feedback = await prisma.mockInterviewFeedback.findFirst({
      where: {
        mockInterviewId: interviewId,
        userId,
      },
      select: getMockInterviewFeedbackData(),
    });
    return feedback || null;
  }
);
