/*
  Warnings:

  - You are about to drop the column `accommodation` on the `Visitor` table. All the data in the column will be lost.
  - Added the required column `name` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Visitor" DROP COLUMN "accommodation",
ALTER COLUMN "city" DROP NOT NULL;
