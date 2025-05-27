-- CreateTable
CREATE TABLE "MaimaiFinale" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "userData" JSONB,

    CONSTRAINT "MaimaiFinale_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MaimaiDX" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "userData" JSONB,

    CONSTRAINT "MaimaiDX_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chunithm" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "userData" JSONB,

    CONSTRAINT "Chunithm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ongeki" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "userData" JSONB,

    CONSTRAINT "Ongeki_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Wacca" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "userData" JSONB,

    CONSTRAINT "Wacca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SDVX" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "userData" JSONB,

    CONSTRAINT "SDVX_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jubeat" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "userData" JSONB,

    CONSTRAINT "Jubeat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IIDX" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "userData" JSONB,

    CONSTRAINT "IIDX_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MaimaiFinale_username_key" ON "MaimaiFinale"("username");

-- CreateIndex
CREATE UNIQUE INDEX "MaimaiDX_username_key" ON "MaimaiDX"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Chunithm_username_key" ON "Chunithm"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Ongeki_username_key" ON "Ongeki"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Wacca_username_key" ON "Wacca"("username");

-- CreateIndex
CREATE UNIQUE INDEX "SDVX_username_key" ON "SDVX"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Jubeat_username_key" ON "Jubeat"("username");

-- CreateIndex
CREATE UNIQUE INDEX "IIDX_username_key" ON "IIDX"("username");
