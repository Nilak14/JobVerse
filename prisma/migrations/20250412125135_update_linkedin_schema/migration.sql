/*
  Warnings:

  - You are about to drop the `app_config` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `linked_in_token` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "app_config" DROP CONSTRAINT "app_config_linkedInTokenId_fkey";

-- DropTable
DROP TABLE "app_config";

-- DropTable
DROP TABLE "linked_in_token";

-- CreateTable
CREATE TABLE "linked_in_tokens" (
    "id" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "linked_in_tokens_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "linked_in_tokens_companyId_key" ON "linked_in_tokens"("companyId");

-- AddForeignKey
ALTER TABLE "linked_in_tokens" ADD CONSTRAINT "linked_in_tokens_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
