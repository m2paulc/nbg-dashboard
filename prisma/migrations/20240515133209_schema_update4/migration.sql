/*
  Warnings:

  - You are about to drop the column `invoiceId` on the `PartsOrderEntry` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PartsOrderEntry" DROP CONSTRAINT "PartsOrderEntry_invoiceId_fkey";

-- AlterTable
ALTER TABLE "Invoices" ADD COLUMN     "partsId" TEXT;

-- AlterTable
ALTER TABLE "PartsOrderEntry" DROP COLUMN "invoiceId";

-- AddForeignKey
ALTER TABLE "Invoices" ADD CONSTRAINT "Invoices_partsId_fkey" FOREIGN KEY ("partsId") REFERENCES "PartsOrderEntry"("partsOrderEntryId") ON DELETE SET NULL ON UPDATE CASCADE;
