"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { handleError } from "@/lib/utils";
import {
  ProfessionalDetailsSchema,
  ProfessionalDetailsSchemaType,
} from "@/schema/JobSeekerSettingSchema";
import { revalidatePath } from "next/cache";

export const professionalDetailsSettings = async (
  value: ProfessionalDetailsSchemaType
) => {
  try {
    const { success, data, error } = ProfessionalDetailsSchema.safeParse(value);

    if (!success) {
      return { success: false, message: error.message };
    }
    const session = await auth();
    if (
      !session ||
      !session.user ||
      !session.jobSeekerId ||
      session.user.type !== "JOB_SEEKER"
    ) {
      throw new Error("User not found");
    }

    await prisma.jobSeekerProfile.update({
      where: { userId: session.jobSeekerId },
      data: {
        skills: data.skills,
        WorkExperience: {
          deleteMany: {},
          create: data.workExperience.map((exp) => ({
            ...exp,
            startDate: exp.startDate || "",
            endDate: exp.endDate || undefined,
          })),
        },
        Education: {
          deleteMany: {},
          create: data.education.map((edu) => ({
            ...edu,
            startDate: edu.startDate || "",
            endDate: edu.endDate || undefined,
          })),
        },
        Certification: {
          deleteMany: {},
          create: data.certifications.map((cert) => ({
            ...cert,
            instituteName: cert.institute,
            completionDate: cert.completionDate || "",
          })),
        },
      },
    });
    revalidatePath(
      "/job-seeker/settings/account-settings?tab=professional-details"
    );
    return { success: true, message: "Professional details updated" };
  } catch (error) {
    return handleError({ error, errorIn: "profileSettings" });
  }
};
