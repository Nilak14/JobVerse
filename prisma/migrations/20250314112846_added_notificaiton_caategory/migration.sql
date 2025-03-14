/*
  Warnings:

  - The `category` column on the `notifications` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "NotificationCategory" AS ENUM ('APPLICATION_STATUS', 'JOB_RECOMMENDATION', 'SUBSCRIPTION_PURCHASED', 'NEW_APPLICATION', 'NEW_MEMBER_JOINED', 'JOB_STATUS', 'PROMOTION');

-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "category",
ADD COLUMN     "category" "NotificationCategory";
