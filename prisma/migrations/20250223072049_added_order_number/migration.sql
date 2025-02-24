/*
  Warnings:

  - A unique constraint covering the columns `[jobSeekerProfileId,order]` on the table `job_seeker_certifications` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[jobSeekerProfileId,order]` on the table `job_seeker_educations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[jobSeekerProfileId,order]` on the table `job_seeker_work_experiences` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `order` to the `job_seeker_certifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `job_seeker_certifications` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `job_seeker_educations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `job_seeker_work_experiences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "job_seeker_certifications" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "job_seeker_educations" ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "job_seeker_work_experiences" ADD COLUMN     "order" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "job_seeker_certifications_jobSeekerProfileId_order_key" ON "job_seeker_certifications"("jobSeekerProfileId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "job_seeker_educations_jobSeekerProfileId_order_key" ON "job_seeker_educations"("jobSeekerProfileId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "job_seeker_work_experiences_jobSeekerProfileId_order_key" ON "job_seeker_work_experiences"("jobSeekerProfileId", "order");
