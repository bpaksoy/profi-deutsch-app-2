/*
  Warnings:

  - You are about to drop the column `endedAt` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `sessionId` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `startedAt` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `KnowledgeDocument` table. All the data in the column will be lost.
  - You are about to drop the column `transcription` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `lastPracticeAt` on the `Progress` table. All the data in the column will be lost.
  - You are about to drop the column `level` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[stripeCustomerId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[stripeSubscriptionId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Conversation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `topic` on table `Conversation` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Phrase` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Conversation" DROP CONSTRAINT "Conversation_userId_fkey";

-- DropForeignKey
ALTER TABLE "KnowledgeChunk" DROP CONSTRAINT "KnowledgeChunk_documentId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "Phrase" DROP CONSTRAINT "Phrase_userId_fkey";

-- DropForeignKey
ALTER TABLE "Progress" DROP CONSTRAINT "Progress_userId_fkey";

-- DropIndex
DROP INDEX "Conversation_sessionId_key";

-- DropIndex
DROP INDEX "KnowledgeChunk_documentId_idx";

-- DropIndex
DROP INDEX "Message_conversationId_idx";

-- DropIndex
DROP INDEX "Phrase_category_idx";

-- DropIndex
DROP INDEX "Phrase_userId_idx";

-- AlterTable
ALTER TABLE "Conversation" DROP COLUMN "endedAt",
DROP COLUMN "sessionId",
DROP COLUMN "startedAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "topic" SET NOT NULL,
ALTER COLUMN "topic" SET DEFAULT 'Neues Gespräch';

-- AlterTable
ALTER TABLE "KnowledgeDocument" DROP COLUMN "updatedAt",
ALTER COLUMN "category" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "transcription";

-- AlterTable
ALTER TABLE "Phrase" ALTER COLUMN "userId" SET NOT NULL,
ALTER COLUMN "category" SET DEFAULT 'General';

-- AlterTable
ALTER TABLE "Progress" DROP COLUMN "createdAt",
DROP COLUMN "lastPracticeAt",
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "level",
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "planTier" TEXT NOT NULL DEFAULT 'FREE',
ADD COLUMN     "stripeCurrentPeriodEnd" TIMESTAMP(3),
ADD COLUMN     "stripeCustomerId" TEXT,
ADD COLUMN     "stripePriceId" TEXT,
ADD COLUMN     "stripeSubscriptionId" TEXT,
ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeCustomerId_key" ON "User"("stripeCustomerId");

-- CreateIndex
CREATE UNIQUE INDEX "User_stripeSubscriptionId_key" ON "User"("stripeSubscriptionId");

-- AddForeignKey
ALTER TABLE "Conversation" ADD CONSTRAINT "Conversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phrase" ADD CONSTRAINT "Phrase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Progress" ADD CONSTRAINT "Progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("clerkId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KnowledgeChunk" ADD CONSTRAINT "KnowledgeChunk_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "KnowledgeDocument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
