"use server";

import { getJobSeekerSubscriptionLevel } from "@/data-access/subscription/jobseekerSubscription";
import gemini from "@/gemini";
import { auth } from "@/lib/auth";
import { canUseAITools } from "@/lib/permissions/jobSeeker-permissions";
import {
  GenerateSummaryInput,
  generateSummarySchema,
} from "@/schema/ResumeEditorSchema";

export async function generateResumeSummary(input: GenerateSummaryInput) {
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
  const { jobTitle, workExperiences, educations, skills } =
    generateSummarySchema.parse(input);

  const systemMessage = `
    You are a job resume generator AI. Your task is to write a professional introduction summary for a resume given the user's provided data.
    Only return the summary and do not include any other information in the response. Keep it concise and professional. 
    `;

  const userMessage = `
    Please generate a professional resume summary from this data:

    Job title: ${jobTitle || "N/A"}

    Work experience:
    ${workExperiences
      ?.map(
        (exp) => `
        Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}

        Description:
        ${exp.description || "N/A"}
        `
      )
      .join("\n\n")}

      Education:
    ${educations
      ?.map(
        (edu) => `
        Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} from ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}
        `
      )
      .join("\n\n")}

      Skills:
      ${skills}
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
  return result;
}
