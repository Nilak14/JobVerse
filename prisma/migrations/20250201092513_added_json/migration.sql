/*
  Warnings:

  - The `description` column on the `companies` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `description` column on the `jobs` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[name]` on the table `sub_categories` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "companies" DROP COLUMN "description",
ADD COLUMN     "description" JSONB;

-- AlterTable
ALTER TABLE "jobs" DROP COLUMN "description",
ADD COLUMN     "description" JSONB;

-- CreateIndex
CREATE UNIQUE INDEX "sub_categories_name_key" ON "sub_categories"("name");
