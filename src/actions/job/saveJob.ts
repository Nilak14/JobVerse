"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { jobSchema } from "@/schema/JobBackendValidationSchema";
import { JobSchemaType } from "@/schema/CreateJobSchema";
import { revalidatePath } from "next/cache";
import { getCompanySubscriptionLevel } from "@/data-access/subscription/companySubscription";
import { canPostJob } from "@/lib/permissions/company-permissions";

export const saveJob = async (values: JobSchemaType) => {
  const session = await auth();
  if (
    !session ||
    !session.user ||
    !session.activeCompanyId ||
    !session.employerId ||
    session.user.type !== "EMPLOYER"
  ) {
    throw new Error("Unauthorized");
  }

  const subscriptionLevel = await getCompanySubscriptionLevel(
    session.activeCompanyId
  );

  const {
    id: jobId,
    salaryType,
    minSalaryAmount,
    maxSalaryAmount,
    amount,
    salaryCurrency,
    salaryRate,
    ...jobValues
  } = jobSchema.parse(values);

  if (!jobId) {
    const jobCount = await prisma.job.count({
      where: { companyId: session.activeCompanyId },
    });

    if (!canPostJob(subscriptionLevel, jobCount)) {
      throw new Error(
        "You have reached the maximum number of jobs allowed for your subscription level. Please purchase a higher subscription to post more jobs."
      );
    }
  }

  const existingJob = jobId
    ? await prisma.job.findUnique({
        where: { id: jobId, companyId: session.activeCompanyId },
        include: {
          Salary: true,
        },
      })
    : null;

  if (jobId && !existingJob) {
    throw new Error("Job not found");
  }

  if (jobId) {
    //update the job
    const job = await prisma.job.update({
      where: { id: jobId },
      data: {
        title: values.title,
        jobType: values.jobType,
        workMode: values.workMode,
        location: values.location,
        categoryId: values.categoryId || null,
        subcategoryId: values.subCategoryId || null,
        experienceLevel: values.experienceLevel,
        totalHeads: values.totalHeads,
        benefits: values.benefits || [""],
        description: values.description,
        tags: values.tags,
        skills: values.skills,
        minEducationRequired: values.educationLevel,
        preferredGender: values.preferredGender,
        licenseRequired: values.license,
        vehicleRequired: values.vehicle,
        resumeRequired: values.resumeRequired,
        isUrgent: values.isUrgent,
        deadline: values.applicationDeadline,
        sendEmailNotification: values.getEmailNotification,
        latitude: values.latitude,
        longitude: values.longitude,
        postInLinkedIn: values.postInLinkedin,
        linkedInCaption: values.linkedinCaption,
        Salary: {
          delete: {
            id: existingJob?.Salary?.id,
          },
          create: {
            type: salaryType,
            minAmount: Number(minSalaryAmount) || null,
            maxAmount: Number(maxSalaryAmount) || null,
            amount: Number(amount) || null,
            currency: salaryCurrency,
            rate: salaryRate,
          },
        },
      },
    });
    revalidatePath("/employer/job");
    return job;
  } else {
    // make new entry
    const job = await prisma.job.create({
      data: {
        title: values.title,
        jobType: values.jobType,
        workMode: values.workMode,
        location: values.location,
        categoryId: values.categoryId || null,
        subcategoryId: values.subCategoryId || null,
        experienceLevel: values.experienceLevel,
        totalHeads: values.totalHeads,
        benefits: values.benefits ?? [],
        description: values.description,
        tags: values.tags || [],
        skills: values.skills || [],
        postInLinkedIn: values.postInLinkedin,
        linkedInCaption: values.linkedinCaption,
        minEducationRequired: values.educationLevel,
        preferredGender: values.preferredGender,
        licenseRequired: values.license,
        vehicleRequired: values.vehicle,
        resumeRequired: values.resumeRequired,
        isUrgent: values.isUrgent,
        deadline: values.applicationDeadline || null,
        sendEmailNotification: values.getEmailNotification,
        createdBy: session.employerId,
        latitude: values.latitude,
        longitude: values.longitude,
        companyId: session.activeCompanyId,
        Salary: {
          create: {
            type: salaryType,
            minAmount: Number(minSalaryAmount),
            maxAmount: Number(maxSalaryAmount),
            amount: Number(amount),
            currency: salaryCurrency,
            rate: salaryRate,
          },
        },
      },
    });
    revalidatePath("/employer/job");
    return job;
  }
};
