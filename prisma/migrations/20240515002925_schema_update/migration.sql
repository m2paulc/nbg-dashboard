/*
  Warnings:

  - You are about to drop the column `carEngineSize` on the `Cars` table. All the data in the column will be lost.
  - You are about to drop the column `carOdometerIn` on the `Cars` table. All the data in the column will be lost.
  - You are about to drop the column `carOdometerOut` on the `Cars` table. All the data in the column will be lost.
  - You are about to drop the column `customerOrderId` on the `PartsOrderEntry` table. All the data in the column will be lost.
  - You are about to drop the column `saleDate` on the `PartsOrderEntry` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PartsOrderEntry" DROP CONSTRAINT "PartsOrderEntry_customerOrderId_fkey";

-- AlterTable
ALTER TABLE "Cars" DROP COLUMN "carEngineSize",
DROP COLUMN "carOdometerIn",
DROP COLUMN "carOdometerOut",
ADD COLUMN     "carOdometer" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "carTireSize" DROP NOT NULL;

-- AlterTable
ALTER TABLE "PartsOrderEntry" DROP COLUMN "customerOrderId",
DROP COLUMN "saleDate",
ADD COLUMN     "customersCustomerId" TEXT,
ALTER COLUMN "skuNumber" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "listPriceInCents" DROP NOT NULL,
ALTER COLUMN "costPriceInCents" DROP NOT NULL,
ALTER COLUMN "quantity" DROP NOT NULL,
ALTER COLUMN "totalPriceInCents" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PartsOrderEntry" ADD CONSTRAINT "PartsOrderEntry_customersCustomerId_fkey" FOREIGN KEY ("customersCustomerId") REFERENCES "Customers"("customerId") ON DELETE SET NULL ON UPDATE CASCADE;
