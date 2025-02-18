-- DropForeignKey
ALTER TABLE "saved_jobs" DROP CONSTRAINT "saved_jobs_id_fkey";

-- AddForeignKey
ALTER TABLE "saved_jobs" ADD CONSTRAINT "saved_jobs_id_fkey" FOREIGN KEY ("id") REFERENCES "job_seekers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
