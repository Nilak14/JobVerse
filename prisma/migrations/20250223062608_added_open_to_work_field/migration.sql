/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `job_seeker_profiles` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "job_seeker_profiles" DROP COLUMN "phoneNumber",
ADD COLUMN     "openToWork" BOOLEAN NOT NULL DEFAULT true;
