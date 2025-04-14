"use server";

import gemini from "@/gemini";
import { fetchAndExtractResumeText } from "@/lib/langchain";
import prisma from "@/lib/prisma";
import { handleError, isCreatedResume } from "@/lib/utils";

interface CreateCandidateRatingParams {
  resumeId: string | null;
  jobSeekerId?: string;
  jobTitle: string | null;
  jobDescription: string | null;
  jobSkills: string | null;
  applicationId: string;
}

export const createCandidateRating = async ({
  applicationId,
  jobTitle,
  jobDescription,
  jobSkills,
  resumeId = "dd",
  jobSeekerId,
}: CreateCandidateRatingParams) => {
  try {
    console.log("runs");

    let data: string;

    if (!jobDescription || !jobTitle || !jobSkills) {
      return handleError({
        error: "Job details are required",
        errorIn: "parseResume",
      });
    }
    let jobDes = jobDescription;
    if (!resumeId) {
      if (!jobSeekerId) {
        return handleError({
          error: "Resume ID is required",
          errorIn: "parseResume",
        });
      }
      const jobseeker = await prisma.jobSeekerProfile.findFirst({
        where: {
          userId: jobSeekerId,
        },
        select: {
          bio: true,
          Certification: {
            select: {
              instituteName: true,
              completionDate: true,
              title: true,
            },
          },
          designation: true,
          Education: {
            select: {
              instituteName: true,
              degreeTitle: true,
              instituteLocation: true,
              startDate: true,
              endDate: true,
            },
          },
          skills: true,
          WorkExperience: {
            select: {
              position: true,
              companyName: true,
              description: true,
              startDate: true,
              endDate: true,
            },
          },
        },
      });
      if (!jobseeker) {
        return handleError({
          error: "Job seeker not found",
          errorIn: "parseResume",
        });
      }
      const formattedData = {
        bio: jobseeker.bio,
        Certification: jobseeker.Certification,
        designation: jobseeker.designation,
        Education: jobseeker.Education,
        skills: jobseeker.skills,
        WorkExperience: jobseeker.WorkExperience,
      };
      data = JSON.stringify(formattedData);
    } else {
      const isResumeCreated = isCreatedResume(resumeId);
      if (isResumeCreated) {
        const createdResume = await prisma.resume.findUnique({
          where: {
            id: resumeId,
          },
          select: {
            Certifications: {
              select: {
                instituteName: true,
                completionDate: true,
                title: true,
              },
            },
            educations: {
              select: {
                degree: true,
                school: true,
                startDate: true,
                endDate: true,
              },
            },
            skills: true,
            description: true,
            fullName: true,
            workExperiences: {
              select: {
                company: true,
                position: true,
                description: true,
                startDate: true,
                endDate: true,
              },
            },
          },
        });
        if (!createdResume) {
          return handleError({
            error: "Resume not found",
            errorIn: "parseResume",
          });
        }
        const formattedData = {
          bio: createdResume.description,
          Certification: createdResume.Certifications,
          name: createdResume.fullName,
          Education: createdResume.educations,
          skills: createdResume.skills,
          WorkExperience: createdResume.workExperiences,
        };
        data = JSON.stringify(formattedData);
      } else {
        const resume = await prisma.userUploadedResume.findUnique({
          where: {
            id: resumeId,
          },
          select: {
            resumeUrl: true,
          },
        });
        if (!resume) {
          throw new Error("Resume not found");
        }
        const resumeText = await fetchAndExtractResumeText(resume.resumeUrl);
        data = resumeText;
      }
    }

    if (!data) {
      return handleError({
        error: "Resume data is empty",
        errorIn: "parseResume",
      });
    }

    const words = data.split(" ");
    if (words.length > 500) {
      data = words.slice(0, 500).join(" ");
    }

    // same for job description
    const jobDesWords = jobDescription.split(" ");
    if (jobDesWords.length > 500) {
      jobDes = jobDesWords.slice(0, 500).join(" ");
    }

    const systemMessage =
      "You are an candidate rating AI. Your main task is to give rating to the applicants by analyzing their details and job details. You must rate or give match percentage between 0 - 100 and in response only return rating like of 1 digit, two digit don't include more that that and also job description will come in tiptap editor json format so manage accordingly. If candidate description  don't look like candidate description then you can give very low marks as this description are parsed from candidate resume and may be they can upload random things instead of their pdf like give 0";

    const userMessage = `Analyze this details of job and candidate and give rating based on this data.
    Job Description:
    Job Title: ${jobTitle}
    Job Description: ${jobDes}
    Job Skills: ${jobSkills}
    Candidate Details:
    ${data}
    `;
    const model = gemini.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: systemMessage,
      generationConfig: {
        temperature: 0.7,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 1500,
        responseMimeType: "text/plain",
      },
    });
    const aiResponse = await model.generateContent(userMessage);
    const result = aiResponse.response.text();
    if (!result) {
      return handleError({
        error: "Failed to generate rating",
        errorIn: "parseResume",
      });
    }
    const rating = result.trim();

    await prisma.application.update({
      where: {
        id: applicationId,
      },
      data: {
        rating: rating,
      },
    });
    return { success: true, message: "Rating created successfully" };
  } catch (error) {
    return handleError({ error: error, errorIn: "parseResume" });
  }
};
