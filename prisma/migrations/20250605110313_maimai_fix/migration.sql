/*
  Warnings:

  - You are about to drop the column `maimaiFinale` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "maimaiFinale",
ADD COLUMN     "maimai" JSONB;
