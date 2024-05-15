/*
  Warnings:

  - Made the column `taxInPercentage` on table `Invoices` required. This step will fail if there are existing NULL values in that column.
  - Made the column `laborHourlyRateInCents` on table `Invoices` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Invoices" ALTER COLUMN "taxInPercentage" SET NOT NULL,
ALTER COLUMN "laborHourlyRateInCents" SET NOT NULL;
