/*
  Warnings:

  - Added the required column `title` to the `user_uploaded_resumes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_uploaded_resumes" ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;
