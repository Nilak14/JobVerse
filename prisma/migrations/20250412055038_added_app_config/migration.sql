-- CreateTable
CREATE TABLE "app_config" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "linkedInTokenId" TEXT,

    CONSTRAINT "app_config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "linked_in_token" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "linked_in_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "app_config_linkedInTokenId_key" ON "app_config"("linkedInTokenId");

-- AddForeignKey
ALTER TABLE "app_config" ADD CONSTRAINT "app_config_linkedInTokenId_fkey" FOREIGN KEY ("linkedInTokenId") REFERENCES "linked_in_token"("id") ON DELETE CASCADE ON UPDATE CASCADE;
