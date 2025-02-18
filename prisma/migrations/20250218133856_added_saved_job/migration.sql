/*
  Warnings:

  - You are about to drop the `JobReview` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "JobReview" DROP CONSTRAINT "JobReview_jobId_fkey";

-- DropForeignKey
ALTER TABLE "JobReview" DROP CONSTRAINT "JobReview_reviewedBy_fkey";

-- DropTable
DROP TABLE "JobReview";

-- CreateTable
CREATE TABLE "job_reviews" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "reviewedStatus" "JobReviewStatus",
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "reviewedComment" TEXT,

    CONSTRAINT "job_reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saved_jobs" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "saved_jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "job_reviews_jobId_key" ON "job_reviews"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "saved_jobs_userId_jobId_key" ON "saved_jobs"("userId", "jobId");

-- AddForeignKey
ALTER TABLE "job_reviews" ADD CONSTRAINT "job_reviews_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_reviews" ADD CONSTRAINT "job_reviews_reviewedBy_fkey" FOREIGN KEY ("reviewedBy") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_jobs" ADD CONSTRAINT "saved_jobs_id_fkey" FOREIGN KEY ("id") REFERENCES "job_seekers"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saved_jobs" ADD CONSTRAINT "saved_jobs_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
