/*
  Warnings:

  - You are about to drop the column `location` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "location",
ADD COLUMN     "latitude" TEXT,
ADD COLUMN     "longitude" TEXT,
ALTER COLUMN "description" DROP NOT NULL;
