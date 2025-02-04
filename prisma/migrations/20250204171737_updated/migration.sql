/*
  Warnings:

  - You are about to drop the column `totalHead` on the `jobs` table. All the data in the column will be lost.
  - You are about to drop the column `exactSalary` on the `salaries` table. All the data in the column will be lost.
  - You are about to drop the column `maxSalary` on the `salaries` table. All the data in the column will be lost.
  - You are about to drop the column `minSalary` on the `salaries` table. All the data in the column will be lost.
  - The `type` column on the `salaries` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `rate` column on the `salaries` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterEnum
ALTER TYPE "JobStatus" ADD VALUE 'DELETED';

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_categoryId_fkey";

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "totalHead",
ADD COLUMN     "benefits" TEXT[],
ADD COLUMN     "deadline" TIMESTAMP(3),
ADD COLUMN     "experienceLevel" TEXT,
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isUrgent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "jobType" TEXT,
ADD COLUMN     "licenseRequired" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "minEducationRequired" TEXT,
ADD COLUMN     "preferredGender" TEXT,
ADD COLUMN     "resumeRequired" TEXT,
ADD COLUMN     "sendEmailNotification" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "totalHeads" TEXT,
ADD COLUMN     "vehicleRequired" TEXT,
ADD COLUMN     "workMode" TEXT,
ALTER COLUMN "title" DROP NOT NULL,
ALTER COLUMN "categoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "salaries" DROP COLUMN "exactSalary",
DROP COLUMN "maxSalary",
DROP COLUMN "minSalary",
ADD COLUMN     "amount" DOUBLE PRECISION,
ADD COLUMN     "maxAmount" DOUBLE PRECISION,
ADD COLUMN     "minAmount" DOUBLE PRECISION,
DROP COLUMN "type",
ADD COLUMN     "type" TEXT,
ALTER COLUMN "currency" DROP NOT NULL,
DROP COLUMN "rate",
ADD COLUMN     "rate" TEXT;

-- DropEnum
DROP TYPE "JobType";

-- DropEnum
DROP TYPE "Rate";

-- DropEnum
DROP TYPE "SalaryType";

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "job_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;
