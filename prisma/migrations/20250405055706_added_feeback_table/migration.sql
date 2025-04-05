-- AlterTable
ALTER TABLE "mock_interviews" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "mock_interview_feedbacks" (
    "id" TEXT NOT NULL,
    "mockInterviewId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "totalScore" DOUBLE PRECISION,
    "strengths" TEXT[],
    "areaForImprovement" TEXT[],
    "finalAssessment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mock_interview_feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category_scores" (
    "id" TEXT NOT NULL,
    "feedbackId" TEXT NOT NULL,
    "name" TEXT,
    "score" DOUBLE PRECISION NOT NULL,
    "comment" TEXT,

    CONSTRAINT "category_scores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "mock_interview_feedbacks" ADD CONSTRAINT "mock_interview_feedbacks_mockInterviewId_fkey" FOREIGN KEY ("mockInterviewId") REFERENCES "mock_interviews"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mock_interview_feedbacks" ADD CONSTRAINT "mock_interview_feedbacks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "job_seekers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "category_scores" ADD CONSTRAINT "category_scores_feedbackId_fkey" FOREIGN KEY ("feedbackId") REFERENCES "mock_interview_feedbacks"("id") ON DELETE CASCADE ON UPDATE CASCADE;
