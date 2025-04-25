/*
  Warnings:

  - Made the column `id` on table `follows` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "follows" ALTER COLUMN "id" SET NOT NULL,
ADD CONSTRAINT "follows_pkey" PRIMARY KEY ("id");
