/*
  Warnings:

  - The `resumeRequired` column on the `jobs` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "resumeRequired",
ADD COLUMN     "resumeRequired" BOOLEAN NOT NULL DEFAULT false;
