-- AlterTable
ALTER TABLE "companies" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "company_members" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
