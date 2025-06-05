/*
  Warnings:

  - You are about to drop the `Chunithm` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IIDX` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Jubeat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MaimaiDX` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MaimaiFinale` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ongeki` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SDVX` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wacca` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Chunithm";

-- DropTable
DROP TABLE "IIDX";

-- DropTable
DROP TABLE "Jubeat";

-- DropTable
DROP TABLE "MaimaiDX";

-- DropTable
DROP TABLE "MaimaiFinale";

-- DropTable
DROP TABLE "Ongeki";

-- DropTable
DROP TABLE "SDVX";

-- DropTable
DROP TABLE "Wacca";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "maimaiFinale" JSONB,
    "maimaiDX" JSONB,
    "chunithm" JSONB,
    "ongeki" JSONB,
    "wacca" JSONB,
    "sdvx" JSONB,
    "jubeat" JSONB,
    "iidx" JSONB,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
