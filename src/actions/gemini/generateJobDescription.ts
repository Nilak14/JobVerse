"use server";

import { getCompanySubscriptionLevel } from "@/data-access/subscription/companySubscription";
import gemini from "@/gemini";
import { auth } from "@/lib/auth";
import { canUseAITools } from "@/lib/permissions/company-permissions";
import { jobSchema, JobSchemaType } from "@/schema/CreateJobSchema";

export async function generateJobDescription(input: JobSchemaType) {
  const session = await auth();
  if (!session || !session.user || !session.activeCompanyId) {
    throw new Error("Unauthorized");
  }
  const subscriptionLevel = await getCompanySubscriptionLevel(
    session.activeCompanyId
  );
  if (!canUseAITools(subscriptionLevel)) {
    throw new Error("You need a premium subscription to use this feature");
  }
  const {
    amount,
    benefits,
    educationLevel,
    experienceLevel,
    jobType,
    license,
    maxSalaryAmount,
    minSalaryAmount,
    preferredGender,
    salaryCurrency,
    salaryRate,
    salaryType,
    skills,
    tags,
    title,
    totalHeads,
    workMode,
    location,
    vehicle,
  } = input;

  const systemMessage = `
    You are a professional job description generator AI. Your task is to generate a concise, professional job description that includes key responsibilities, required qualifications, perks and benefits, and additional "good to have" skills. Provide your response strictly in valid JSON format for a Tiptap editor. Do not include any markdown formatting, extra text, or code blocks. use listItem for bullet points not list_item and main type for it is bulletList.No need to include job title or other details as it is already display , we just need that middle part of the job description.
  `;

  const userMessage = `
    Generate a professional job description based on the following data:
    Title: ${title}
    Location: ${location}
    Job Type: ${jobType}
    Work Mode: ${workMode}
    Total Heads: ${totalHeads}
    Experience Level: ${experienceLevel}
    Education Level: ${educationLevel}
    Salary Type: ${salaryType}
    Salary Amount: ${amount}
    Salary Currency: ${salaryCurrency}
    Salary Rate: ${salaryRate}
    Min Salary Amount: ${minSalaryAmount}
    Max Salary Amount: ${maxSalaryAmount}
    Skills: ${skills}
    Benefits: ${benefits}
    Tags: ${tags}
    License: ${license}
    Preferred Gender: ${preferredGender}
    Vehicle: ${vehicle}
  `;

  const model = gemini.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: systemMessage,
    generationConfig: {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 1000,
      responseMimeType: "text/plain",
    },
  });

  const aiResponse = await model.generateContent(userMessage);
  const result = aiResponse.response.text();
  if (!result) {
    throw new Error("Failed to generate description");
  }
  let trimmed = result.trim();
  if (trimmed.startsWith("```json")) {
    trimmed = trimmed.replace(/^```json\s*/, "");
  }
  if (trimmed.endsWith("```")) {
    trimmed = trimmed.replace(/```$/, "");
  }

  return trimmed.trim();
}
