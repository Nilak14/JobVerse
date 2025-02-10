-- CreateEnum
CREATE TYPE "JobReviewStatus" AS ENUM ('APPROVED', 'REJECTED', 'NEED_REVIEW');

-- CreateTable
CREATE TABLE "JobReview" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "reviewedStatus" "JobReviewStatus",
    "reviewedBy" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "reviewedComment" TEXT,

    CONSTRAINT "JobReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JobReview_jobId_key" ON "JobReview"("jobId");

-- AddForeignKey
ALTER TABLE "JobReview" ADD CONSTRAINT "JobReview_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobReview" ADD CONSTRAINT "JobReview_reviewedBy_fkey" FOREIGN KEY ("reviewedBy") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;
