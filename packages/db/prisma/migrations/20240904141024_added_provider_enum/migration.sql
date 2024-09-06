/*
  Warnings:

  - Changed the type of `provider` on the `OnRampTransaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('HDFC', 'ICICI');

-- AlterTable
ALTER TABLE "Balances" ALTER COLUMN "amount" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "OnRampTransaction" DROP COLUMN "provider",
ADD COLUMN     "provider" "Provider" NOT NULL,
ALTER COLUMN "startTime" SET DEFAULT CURRENT_TIMESTAMP;
