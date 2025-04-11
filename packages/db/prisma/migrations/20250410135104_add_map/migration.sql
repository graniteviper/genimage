-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other');

-- CreateEnum
CREATE TYPE "Ethnicity" AS ENUM ('White', 'Black', 'Asian American', 'East Asian', 'South Asian', 'Hispanic', 'Pacific', 'Middle Eastern', 'Other');

-- CreateEnum
CREATE TYPE "EyeColor" AS ENUM ('brown', 'blue', 'green', 'hazel', 'grey', 'amber', 'other');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "profilePicture" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrainModel" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "ethnicity" "Ethnicity" NOT NULL,
    "eyeColor" "EyeColor" NOT NULL,
    "bald" BOOLEAN NOT NULL,

    CONSTRAINT "TrainModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trainingImages" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,

    CONSTRAINT "trainingImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "outputImages" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,

    CONSTRAINT "outputImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pack" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Pack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "packPrompts" (
    "id" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,
    "packId" TEXT NOT NULL,

    CONSTRAINT "packPrompts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "trainingImages" ADD CONSTRAINT "trainingImages_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "TrainModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "outputImages" ADD CONSTRAINT "outputImages_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "TrainModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
