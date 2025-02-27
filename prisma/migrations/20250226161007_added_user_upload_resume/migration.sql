-- CreateTable
CREATE TABLE "user_uploaded_resumes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "resumeUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_uploaded_resumes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_uploaded_resumes" ADD CONSTRAINT "user_uploaded_resumes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "job_seekers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
