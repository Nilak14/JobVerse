import prisma from "@/lib/prisma";
import {
  getMockInterviewData,
  getMockInterviewDataWithFeedback,
  MockInterviewData,
} from "@/lib/prisma-types/MockInterview";
import { cache } from "react";

export const getUserMockInterview = cache(async (userId: string) => {
  const mockInterview = await prisma.mockInterview.findMany({
    where: {
      userId,
      isDeleted: false,
      deletedAt: null,
    },
    select: getMockInterviewData(),
    orderBy: {
      createdAt: "desc",
    },
  });
  return mockInterview || ([] as MockInterviewData[]);
});

export const getSingleMockInterview = cache(async (id: string) => {
  const mockInterview = await prisma.mockInterview.findUnique({
    where: {
      id,
    },
    select: getMockInterviewData(),
  });
  return mockInterview;
});

export const getUserMockInterviewWithFeedback = cache(
  async (userId: string) => {
    const mockInterview = await prisma.mockInterview.findMany({
      where: {
        userId,
        isDeleted: false,
        deletedAt: null,
        MockInterviewFeedback: {
          some: {
            userId,
          },
        },
      },
      select: getMockInterviewDataWithFeedback(),
    });
    return mockInterview;
  }
);
