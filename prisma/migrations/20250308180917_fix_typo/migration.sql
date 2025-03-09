/*
  Warnings:

  - You are about to drop the column `stipeCustomerId` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "stipeCustomerId",
ADD COLUMN     "stripeCustomerId" TEXT;
