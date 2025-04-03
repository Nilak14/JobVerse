/*
  Warnings:

  - The `techStack` column on the `mock_interviews` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `questions` column on the `mock_interviews` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "mock_interviews" DROP COLUMN "techStack",
ADD COLUMN     "techStack" TEXT[],
DROP COLUMN "questions",
ADD COLUMN     "questions" TEXT[];
