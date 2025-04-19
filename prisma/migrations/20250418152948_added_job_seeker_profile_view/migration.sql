-- AlterTable
ALTER TABLE "job_seeker_profiles" ADD COLUMN     "activeResume" TEXT;

-- CreateTable
CREATE TABLE "job_seeker_profile_views" (
    "id" TEXT NOT NULL,
    "jobSeekerId" TEXT NOT NULL,
    "viewedBy" TEXT NOT NULL,
    "viewedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_seeker_profile_views_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "job_seeker_profile_views" ADD CONSTRAINT "job_seeker_profile_views_jobSeekerId_fkey" FOREIGN KEY ("jobSeekerId") REFERENCES "job_seekers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_seeker_profile_views" ADD CONSTRAINT "job_seeker_profile_views_viewedBy_fkey" FOREIGN KEY ("viewedBy") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
