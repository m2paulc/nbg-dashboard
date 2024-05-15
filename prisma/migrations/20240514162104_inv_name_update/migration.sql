/*
  Warnings:

  - You are about to drop the column `LaborDescription` on the `Invoices` table. All the data in the column will be lost.
  - You are about to drop the column `LaborHourlyRateInCents` on the `Invoices` table. All the data in the column will be lost.
  - You are about to drop the column `LaborHours` on the `Invoices` table. All the data in the column will be lost.
  - You are about to drop the column `LaborTotalCostInCents` on the `Invoices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invoices" DROP COLUMN "LaborDescription",
DROP COLUMN "LaborHourlyRateInCents",
DROP COLUMN "LaborHours",
DROP COLUMN "LaborTotalCostInCents",
ADD COLUMN     "laborDescription" TEXT,
ADD COLUMN     "laborHourlyRateInCents" INTEGER,
ADD COLUMN     "laborHours" INTEGER,
ADD COLUMN     "laborTotalCostInCents" INTEGER;
