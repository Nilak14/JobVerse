"use server";

import { getJobSeekerSubscriptionLevel } from "@/data-access/subscription/jobseekerSubscription";
import { auth } from "@/lib/auth";
import {
  canCreateResume,
  canUseCustomizations,
} from "@/lib/permissions/jobSeeker-permissions";
import prisma from "@/lib/prisma";
import { resumeSchema, ResumeValues } from "@/schema/ResumeEditorSchema";
import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import path from "path";
export async function saveResume(values: ResumeValues) {
  const { id, templateId } = values;

  const { photo, certification, workExperiences, educations, ...resumeValues } =
    resumeSchema.parse(values);

  const session = await auth();
  if (
    !session ||
    !session.user ||
    !session.jobSeekerId ||
    session.user.isBlocked ||
    !session.user.id
  ) {
    throw new Error("Unauthorized");
  }
  const subscriptionLevel = await getJobSeekerSubscriptionLevel(
    session.user.id
  );

  if (!id) {
    const resumeCount = await prisma.resume.count({
      where: { userId: session.jobSeekerId },
    });
    if (!canCreateResume(subscriptionLevel, resumeCount)) {
      throw new Error(
        "You have reached the maximum number of resumes allowed for your subscription level"
      );
    }
  }

  const existingResume = id
    ? await prisma.resume.findUnique({
        where: { id, userId: session.jobSeekerId },
      })
    : null;

  if (id && !existingResume) {
    throw new Error("Resume not found");
  }
  const hasCustomizations =
    (resumeValues.borderStyle &&
      resumeValues.borderStyle !== existingResume?.borderStyle) ||
    (resumeValues.colorHex &&
      resumeValues.colorHex !== existingResume?.colorHex);

  if (hasCustomizations && !canUseCustomizations(subscriptionLevel)) {
    throw new Error("You do not have permission to use custom customizations");
  }

  let newPhotoUrl: string | undefined | null = undefined;
  if (photo instanceof File) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }
    const blob = await put(`resume_photos/${path.extname(photo.name)}`, photo, {
      access: "public",
    });
    newPhotoUrl = blob.url;
  } else if (photo === null) {
    if (existingResume?.photoUrl) {
      await del(existingResume.photoUrl);
    }
    newPhotoUrl = null;
  } else if (typeof photo === "string") {
    newPhotoUrl = photo;
  }
  revalidatePath("/job-seeker/design-studio/resume");

  if (id) {
    return prisma.resume.update({
      where: { id },
      data: {
        ...resumeValues,
        templateId: templateId || undefined,
        photoUrl: newPhotoUrl,
        workExperiences: {
          deleteMany: {},
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        educations: {
          deleteMany: {},
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
        Certifications: {
          deleteMany: {},
          create: certification?.map((cert) => ({
            ...cert,
            completionDate: cert.completionDate
              ? new Date(cert.completionDate)
              : undefined,
          })),
        },
        updatedAt: new Date(),
      },
    });
  } else {
    return prisma.resume.create({
      data: {
        ...resumeValues,
        templateId: templateId || undefined,
        userId: session.jobSeekerId,
        photoUrl: newPhotoUrl,
        workExperiences: {
          create: workExperiences?.map((exp) => ({
            ...exp,
            startDate: exp.startDate ? new Date(exp.startDate) : undefined,
            endDate: exp.endDate ? new Date(exp.endDate) : undefined,
          })),
        },
        Certifications: {
          create: certification?.map((cert) => ({
            ...cert,
            completionDate: cert.completionDate
              ? new Date(cert.completionDate)
              : undefined,
          })),
        },
        educations: {
          create: educations?.map((edu) => ({
            ...edu,
            startDate: edu.startDate ? new Date(edu.startDate) : undefined,
            endDate: edu.endDate ? new Date(edu.endDate) : undefined,
          })),
        },
      },
    });
  }
}
