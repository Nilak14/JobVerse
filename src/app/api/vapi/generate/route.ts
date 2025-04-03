import { NextRequest } from "next/server";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
import prisma from "@/lib/prisma";

export const GET = async () => {
  try {
    return Response.json({ message: "Hello from VAPI" });
  } catch (error) {
    return Response.json(
      { error: "Error generating interview" },
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { type, role, level, techStack, amount, userId } = await req.json();
    const { text: questions } = await generateText({
      model: google("gemini-2.0-flash-001"),
      prompt: `Prepare questions for a job interview.
        The job role is ${role}.
        The job experience level is ${level}.
        The tech stack used in the job is: ${techStack}.
        The focus between behavioral and technical questions should lean towards: ${type}.
        The amount of questions required is: ${amount}.
        Please return only the questions, without any additional text.
        The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
        Return the questions formatted like this:
        ["Question 1", "Question 2", "Question 3"]

        Thank you! <3
    `,
    });

    const interview = {
      role,
      type,
      level,
      techStack: techStack.split(","),
      questions: JSON.parse(questions),
      userId,
      createdAt: new Date().toISOString(),
      finalized: true,
    };
    await prisma.mockInterview.create({
      data: interview,
    });
    return Response.json(
      {
        success: true,
        message: "Interview generated",
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error generating interview",
        error: error,
      },
      { status: 500 }
    );
  }
};
