/*
  Warnings:

  - You are about to drop the column `partsOrderId` on the `Invoices` table. All the data in the column will be lost.
  - You are about to drop the column `customersCustomerId` on the `PartsOrderEntry` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Invoices" DROP CONSTRAINT "Invoices_partsOrderId_fkey";

-- DropForeignKey
ALTER TABLE "PartsOrderEntry" DROP CONSTRAINT "PartsOrderEntry_customersCustomerId_fkey";

-- AlterTable
ALTER TABLE "Invoices" DROP COLUMN "partsOrderId";

-- AlterTable
ALTER TABLE "PartsOrderEntry" DROP COLUMN "customersCustomerId",
ADD COLUMN     "invoiceId" TEXT;

-- AddForeignKey
ALTER TABLE "PartsOrderEntry" ADD CONSTRAINT "PartsOrderEntry_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoices"("invoiceId") ON DELETE SET NULL ON UPDATE CASCADE;
