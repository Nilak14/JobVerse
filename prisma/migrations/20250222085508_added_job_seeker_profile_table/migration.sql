-- CreateTable
CREATE TABLE "job_seeker_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "location" TEXT,
    "phoneNumber" TEXT,
    "designation" TEXT,
    "profileVisibility" BOOLEAN NOT NULL DEFAULT true,
    "bio" TEXT,
    "skills" TEXT[],
    "receiveJobRecommendationEmail" BOOLEAN NOT NULL DEFAULT true,
    "receiveJobApplicationUpdated" BOOLEAN NOT NULL DEFAULT true,
    "receiveMarketingEmails" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_seeker_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_seeker_work_experiences" (
    "id" TEXT NOT NULL,
    "jobSeekerProfileId" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_seeker_work_experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_seeker_educations" (
    "id" TEXT NOT NULL,
    "jobSeekerProfileId" TEXT NOT NULL,
    "degreeTitle" TEXT NOT NULL,
    "instituteName" TEXT NOT NULL,
    "instituteLocation" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_seeker_educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_seeker_certifications" (
    "id" TEXT NOT NULL,
    "jobSeekerProfileId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "instituteName" TEXT NOT NULL,
    "completionDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_seeker_certifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "job_seeker_profiles_userId_key" ON "job_seeker_profiles"("userId");

-- AddForeignKey
ALTER TABLE "job_seeker_profiles" ADD CONSTRAINT "job_seeker_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "job_seekers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_seeker_work_experiences" ADD CONSTRAINT "job_seeker_work_experiences_jobSeekerProfileId_fkey" FOREIGN KEY ("jobSeekerProfileId") REFERENCES "job_seeker_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_seeker_educations" ADD CONSTRAINT "job_seeker_educations_jobSeekerProfileId_fkey" FOREIGN KEY ("jobSeekerProfileId") REFERENCES "job_seeker_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_seeker_certifications" ADD CONSTRAINT "job_seeker_certifications_jobSeekerProfileId_fkey" FOREIGN KEY ("jobSeekerProfileId") REFERENCES "job_seeker_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
