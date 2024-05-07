-- DropForeignKey
ALTER TABLE "Invoices" DROP CONSTRAINT "Invoices_partsOrderId_fkey";

-- AlterTable
ALTER TABLE "Invoices" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "invoiceDate" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "partsOrderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Invoices" ADD CONSTRAINT "Invoices_partsOrderId_fkey" FOREIGN KEY ("partsOrderId") REFERENCES "PartsOrderEntry"("partsOrderEntryId") ON DELETE SET NULL ON UPDATE CASCADE;
