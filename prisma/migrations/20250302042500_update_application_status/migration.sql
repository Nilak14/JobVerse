/*
  Warnings:

  - Added the required column `reviewedStatus` to the `application_reviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "application_reviews" ADD COLUMN     "reviewedStatus" "ApplicationStatus" NOT NULL;
