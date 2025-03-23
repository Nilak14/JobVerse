-- AlterTable
ALTER TABLE "resumes" ADD COLUMN     "templateId" TEXT;

-- CreateTable
CREATE TABLE "certifications" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "instituteName" TEXT,
    "completionDate" TIMESTAMP(3),
    "resumeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "certifications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "certifications" ADD CONSTRAINT "certifications_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "resumes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
