/*
  Warnings:

  - You are about to drop the column `laborDescription` on the `Invoices` table. All the data in the column will be lost.
  - You are about to drop the column `laborHours` on the `Invoices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invoices" DROP COLUMN "laborDescription",
DROP COLUMN "laborHours",
ALTER COLUMN "laborHourlyRateInCents" SET DEFAULT 8000;

-- AlterTable
ALTER TABLE "PartsOrderEntry" ADD COLUMN     "laborDescription" TEXT,
ADD COLUMN     "laborHours" INTEGER;
