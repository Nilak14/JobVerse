/*
  Warnings:

  - A unique constraint covering the columns `[stripeSubscriptionId]` on the table `company_subscriptions` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stripeSubscriptionId` to the `company_subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "company_subscriptions" ADD COLUMN     "stripeSubscriptionId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "company_subscriptions_stripeSubscriptionId_key" ON "company_subscriptions"("stripeSubscriptionId");
