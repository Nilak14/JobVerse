import { Prisma } from "@prisma/client";

export function getMockInterviewData() {
  return {
    coverImage: true,
    createdAt: true,
    finalized: true,
    id: true,
    level: true,
    questions: true,
    role: true,
    techStack: true,
    updatedAt: true,
    type: true,
  } satisfies Prisma.MockInterviewSelect;
}

export type MockInterviewData = Prisma.MockInterviewGetPayload<{
  select: ReturnType<typeof getMockInterviewData>;
}>;
export function getMockInterviewFeedbackData() {
  return {
    areaForImprovement: true,
    createdAt: true,
    id: true,
    finalAssessment: true,
    mockInterview: {
      select: {
        role: true,
        id: true,
      },
    },
    CategoryScore: {
      select: {
        comment: true,
        feedback: true,
        name: true,
        score: true,
      },
    },
    strengths: true,
    totalScore: true,
  } satisfies Prisma.MockInterviewFeedbackSelect;
}

export type MockInterviewFeedbackData = Prisma.MockInterviewFeedbackGetPayload<{
  select: ReturnType<typeof getMockInterviewFeedbackData>;
}>;
