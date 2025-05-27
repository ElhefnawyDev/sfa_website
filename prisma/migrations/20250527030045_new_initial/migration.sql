/*
  Warnings:

  - Added the required column `contactNumber` to the `demo_requests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "demo_requests" ADD COLUMN     "contactNumber" TEXT NOT NULL;
