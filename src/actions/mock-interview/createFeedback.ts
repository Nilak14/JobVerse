"use server";

import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import { interviewFeedbackSchema } from "@/schema/MockInterviewSchema";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { revalidatePath } from "next/cache";

interface CreateFeedbackParams {
  interviewId: string;
  userId: string;
  transcript: { role: string; content: string }[];
}
interface CreateFeedbackResponse {
  success: boolean;
  message: string;
  data?: {
    feedbackId: string;
  };
}
export const createFeedback = async (
  params: CreateFeedbackParams
): Promise<CreateFeedbackResponse> => {
  const { interviewId, transcript, userId } = params;
  if (!interviewId || !transcript || !userId) {
    throw new Error("Missing required parameters");
  }
  try {
    const formattedTranscript = transcript
      .map((item) => {
        return `- ${item.role} : ${item.content}\n`;
      })
      .join("");
    const {
      object: {
        totalScore,
        categoryScores,
        strengths,
        areasForImprovement,
        finalAssessment,
      },
    } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }),
      schema: interviewFeedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });

    const feedbackExistAlready = await prisma.mockInterviewFeedback.findFirst({
      where: {
        mockInterviewId: interviewId,
        userId,
      },
      select: {
        id: true,
      },
    });

    if (feedbackExistAlready) {
      const updatedFeedback = await prisma.mockInterviewFeedback.update({
        where: {
          id: feedbackExistAlready.id,
        },
        data: {
          totalScore,
          strengths,
          areaForImprovement: areasForImprovement,
          finalAssessment,
          CategoryScore: {
            deleteMany: {},
            create: categoryScores.map((score) => ({
              name: score.name,
              score: score.score,
              comment: score.comment,
            })),
          },
        },
        select: {
          id: true,
        },
      });
      return {
        success: true,
        message: "Feedback Created Successfully",
        data: { feedbackId: updatedFeedback.id },
      };
    }

    const createdFeedback = await prisma.mockInterviewFeedback.create({
      data: {
        userId,
        mockInterviewId: interviewId,
        totalScore,
        strengths,
        areaForImprovement: areasForImprovement,
        finalAssessment,
        CategoryScore: {
          create: categoryScores.map((score) => ({
            name: score.name,
            score: score.score,
            comment: score.comment,
          })),
        },
      },
      select: {
        id: true,
      },
    });
    revalidatePath("/job-seeker/career-coach/mock-interview");
    return {
      success: true,

      message: "Feedback Created Successfully",
      data: { feedbackId: createdFeedback.id },
    };
  } catch (error) {
    return handleError({ error, errorIn: "createFeedback" });
  }
};
