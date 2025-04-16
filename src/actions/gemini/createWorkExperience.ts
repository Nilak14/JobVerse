"use server";

import { getJobSeekerSubscriptionLevel } from "@/data-access/subscription/jobseekerSubscription";
import gemini from "@/gemini";
import { auth } from "@/lib/auth";
import { canUseAITools } from "@/lib/permissions/jobSeeker-permissions";
import {
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
} from "@/schema/ResumeEditorSchema";

export async function generateWorkExperienceGemini(
  input: GenerateWorkExperienceInput
) {
  const session = await auth();

  if (!session || !session.user || !session.jobSeekerId || !session.user.id) {
    throw new Error("Unauthorized");
  }
  const subscriptionLevel = await getJobSeekerSubscriptionLevel(
    session.user.id
  );
  if (!canUseAITools(subscriptionLevel)) {
    throw new Error("You need a premium subscription to use this feature");
  }
  const { description } = generateWorkExperienceSchema.parse(input);

  const systemMessage = `
  You are a job resume generator AI. Your task is to generate a single work experience entry based on the user input.
  Your response must adhere to the following structure. You can omit fields if they can't be inferred from the provided data, but don't add any new ones.

  Job title: <job title>
  Company: <company name>
  Start date: <format: YYYY-MM-DD> (only if provided)
  End date: <format: YYYY-MM-DD> (only if provided)
  Description: <an optimized description in bullet format, might be inferred from the job title>
  `;

  const userMessage = `
  Please provide a work experience entry from this description:
  ${description}
  `;

  const model = gemini.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: systemMessage,
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 400,
      responseMimeType: "text/plain",
    },
  });

  const aiResponse = await model.generateContent(userMessage);
  const result = aiResponse.response.text();
  if (!result) {
    throw new Error("Failed to generate summary");
  }

  return {
    position: result.match(/Job title: (.*)/)?.[1] || "",
    company: result.match(/Company: (.*)/)?.[1] || "",
    description: (result.match(/Description:([\s\S]*)/)?.[1] || "").trim(),
    startDate: result.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1],
    endDate: result.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1],
  } satisfies WorkExperience;
}
