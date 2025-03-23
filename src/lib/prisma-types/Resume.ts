import { Prisma } from "@prisma/client";

export const ResumeDataInclude = {
  workExperiences: true,
  educations: true,
  Certifications: true,
} satisfies Prisma.ResumeInclude;

export type ResumeServerData = Prisma.ResumeGetPayload<{
  include: typeof ResumeDataInclude;
}>;
