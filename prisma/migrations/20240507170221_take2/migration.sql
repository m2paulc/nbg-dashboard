/*
  Warnings:

  - You are about to drop the column `custFirstName` on the `PartsOrderEntry` table. All the data in the column will be lost.
  - You are about to drop the column `custLastName` on the `PartsOrderEntry` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[skuNumber]` on the table `PartsOrderEntry` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `PartsOrderEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PartsOrderEntry" DROP COLUMN "custFirstName",
DROP COLUMN "custLastName",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customerOrderId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PartsOrderEntry_skuNumber_key" ON "PartsOrderEntry"("skuNumber");

-- AddForeignKey
ALTER TABLE "PartsOrderEntry" ADD CONSTRAINT "PartsOrderEntry_customerOrderId_fkey" FOREIGN KEY ("customerOrderId") REFERENCES "Customers"("customerId") ON DELETE SET NULL ON UPDATE CASCADE;
