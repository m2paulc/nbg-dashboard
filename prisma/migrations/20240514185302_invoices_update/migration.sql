/*
  Warnings:

  - You are about to drop the column `commercialPriceInCents` on the `Invoices` table. All the data in the column will be lost.
  - You are about to drop the column `differencePriceInCents` on the `Invoices` table. All the data in the column will be lost.
  - You are about to drop the column `differenceTotalInCents` on the `Invoices` table. All the data in the column will be lost.
  - You are about to drop the column `extededPriceinCents` on the `Invoices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invoices" DROP COLUMN "commercialPriceInCents",
DROP COLUMN "differencePriceInCents",
DROP COLUMN "differenceTotalInCents",
DROP COLUMN "extededPriceinCents",
ADD COLUMN     "partsOrderTotalInCents" INTEGER,
ALTER COLUMN "taxInPercentage" SET DEFAULT 6.625;
