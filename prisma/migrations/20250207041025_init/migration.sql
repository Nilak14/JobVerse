-- CreateEnum
CREATE TYPE "CompanyRole" AS ENUM ('ADMIN', 'MEMBER');

-- CreateEnum
CREATE TYPE "InvitationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PendingCategoryStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('ACCEPTED', 'REJECTED', 'PENDING', 'INDRAFT', 'DELETED');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'JOB_SEEKER', 'EMPLOYER');

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL,
    "logoUrl" TEXT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "website" TEXT,
    "adminEmployerId" TEXT NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "company_members" (
    "id" TEXT NOT NULL,
    "employerId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "role" "CompanyRole" NOT NULL DEFAULT 'MEMBER',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "company_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invitations" (
    "id" TEXT NOT NULL,
    "inviterId" TEXT NOT NULL,
    "inviteeId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "status" "InvitationStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "job_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "jobCategoryId" TEXT NOT NULL,

    CONSTRAINT "sub_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pending_categories" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "submittedBy" TEXT NOT NULL,
    "status" "PendingCategoryStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "pending_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "jobType" TEXT,
    "workMode" TEXT,
    "location" TEXT,
    "categoryId" TEXT,
    "subcategoryId" TEXT,
    "experienceLevel" TEXT,
    "totalHeads" TEXT,
    "benefits" TEXT[],
    "description" TEXT,
    "tags" TEXT[],
    "skills" TEXT[],
    "minEducationRequired" TEXT,
    "preferredGender" TEXT,
    "licenseRequired" TEXT,
    "vehicleRequired" TEXT,
    "resumeRequired" BOOLEAN NOT NULL DEFAULT false,
    "isUrgent" BOOLEAN NOT NULL DEFAULT false,
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "deadline" TIMESTAMP(3),
    "sendEmailNotification" BOOLEAN NOT NULL DEFAULT false,
    "latitude" TEXT,
    "longitude" TEXT,
    "status" "JobStatus" NOT NULL DEFAULT 'INDRAFT',
    "companyId" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "salaries" (
    "id" TEXT NOT NULL,
    "type" TEXT,
    "minAmount" DOUBLE PRECISION,
    "maxAmount" DOUBLE PRECISION,
    "amount" DOUBLE PRECISION,
    "currency" TEXT,
    "rate" TEXT,
    "jobId" TEXT NOT NULL,

    CONSTRAINT "salaries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "email_verification_tokens" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "email_verification_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reset_password_tokens" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "reset_password_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "password" TEXT,
    "userType" "UserType",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "job_seekers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "job_seekers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "employers" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "activeCompanyId" TEXT,

    CONSTRAINT "employers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_members_employerId_companyId_key" ON "company_members"("employerId", "companyId");

-- CreateIndex
CREATE UNIQUE INDEX "job_categories_name_key" ON "job_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sub_categories_name_key" ON "sub_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "pending_categories_name_key" ON "pending_categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "salaries_jobId_key" ON "salaries"("jobId");

-- CreateIndex
CREATE UNIQUE INDEX "email_verification_tokens_email_key" ON "email_verification_tokens"("email");

-- CreateIndex
CREATE UNIQUE INDEX "email_verification_tokens_token_key" ON "email_verification_tokens"("token");

-- CreateIndex
CREATE INDEX "email_verification_tokens_email_idx" ON "email_verification_tokens"("email");

-- CreateIndex
CREATE UNIQUE INDEX "reset_password_tokens_email_key" ON "reset_password_tokens"("email");

-- CreateIndex
CREATE UNIQUE INDEX "reset_password_tokens_token_key" ON "reset_password_tokens"("token");

-- CreateIndex
CREATE INDEX "reset_password_tokens_email_idx" ON "reset_password_tokens"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "job_seekers_userId_key" ON "job_seekers"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "employers_userId_key" ON "employers"("userId");

-- AddForeignKey
ALTER TABLE "companies" ADD CONSTRAINT "companies_adminEmployerId_fkey" FOREIGN KEY ("adminEmployerId") REFERENCES "employers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_members" ADD CONSTRAINT "company_members_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "employers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "company_members" ADD CONSTRAINT "company_members_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_inviterId_fkey" FOREIGN KEY ("inviterId") REFERENCES "employers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_inviteeId_fkey" FOREIGN KEY ("inviteeId") REFERENCES "employers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invitations" ADD CONSTRAINT "invitations_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_categories" ADD CONSTRAINT "sub_categories_jobCategoryId_fkey" FOREIGN KEY ("jobCategoryId") REFERENCES "job_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "job_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "sub_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "employers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "salaries" ADD CONSTRAINT "salaries_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job_seekers" ADD CONSTRAINT "job_seekers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employers" ADD CONSTRAINT "employers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
