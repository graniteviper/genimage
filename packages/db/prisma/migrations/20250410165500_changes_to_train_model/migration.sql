-- AlterTable
ALTER TABLE "TrainModel" ADD COLUMN     "falAIRequestId" TEXT,
ADD COLUMN     "status" "statusEnum" NOT NULL DEFAULT 'Pending',
ADD COLUMN     "tensorPath" TEXT,
ADD COLUMN     "triggerWord" TEXT;

-- AlterTable
ALTER TABLE "outputImages" ADD COLUMN     "falAIRequestId" TEXT;
