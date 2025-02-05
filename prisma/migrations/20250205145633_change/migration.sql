/*
  Warnings:

  - A unique constraint covering the columns `[jobId]` on the table `salaries` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "salaries" DROP CONSTRAINT "salaries_jobId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "salaries_jobId_key" ON "salaries"("jobId");

-- AddForeignKey
ALTER TABLE "salaries" ADD CONSTRAINT "salaries_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
