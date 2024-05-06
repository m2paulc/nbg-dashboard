-- CreateEnum
CREATE TYPE "PaymentCategory" AS ENUM ('CASH', 'CHECK', 'CREDIT_CARD', 'DEBIT_CARD', 'COMPANY_ACCOUNT');

-- CreateTable
CREATE TABLE "Customers" (
    "customerId" TEXT NOT NULL,
    "customerLastName" TEXT NOT NULL,
    "customerFirstName" TEXT NOT NULL,
    "customerAddress" TEXT NOT NULL,
    "customerCity" TEXT NOT NULL,
    "customerState" TEXT NOT NULL,
    "customerZip" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "customerCell" TEXT NOT NULL,
    "customerWorkPhone" TEXT NOT NULL,
    "customerDriverLicense" TEXT NOT NULL,
    "customerDriverLicenseState" TEXT NOT NULL,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "Cars" (
    "carId" TEXT NOT NULL,
    "customerIdentifierId" TEXT NOT NULL,
    "carModel" TEXT NOT NULL,
    "carMake" TEXT NOT NULL,
    "carYear" INTEGER NOT NULL,
    "carEngineSize" INTEGER NOT NULL,
    "carVIN" TEXT NOT NULL,
    "carOdometerIn" INTEGER NOT NULL,
    "carOdometerOut" INTEGER NOT NULL,
    "carLicensePlate" TEXT NOT NULL,
    "carTireSize" TEXT NOT NULL,

    CONSTRAINT "Cars_pkey" PRIMARY KEY ("carId")
);

-- CreateTable
CREATE TABLE "Invoices" (
    "invoiceId" TEXT NOT NULL,
    "invoiceDate" TIMESTAMP(3) NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "customerIdenId" TEXT NOT NULL,
    "customerCarId" TEXT NOT NULL,
    "serviceRequest" TEXT NOT NULL,
    "partsOrderId" TEXT NOT NULL,
    "extededPriceinCents" INTEGER NOT NULL,
    "commercialPriceInCents" INTEGER NOT NULL,
    "differencePriceInCents" INTEGER NOT NULL,
    "differenceTotalInCents" INTEGER NOT NULL,
    "LaborHourlyRateInCents" INTEGER NOT NULL,
    "LaborDescription" TEXT NOT NULL,
    "LaborHours" INTEGER NOT NULL,
    "LaborTotalCostInCents" INTEGER NOT NULL,
    "invoiceDiscountInCents" INTEGER NOT NULL,
    "taxInPercentage" DOUBLE PRECISION NOT NULL,
    "taxInCents" INTEGER NOT NULL,
    "subTotalInCents" INTEGER NOT NULL,
    "invoiceTotalInCents" INTEGER NOT NULL,
    "amountPaidInCents" INTEGER NOT NULL,
    "balanceDueInCents" INTEGER NOT NULL,
    "paymentType" "PaymentCategory" NOT NULL DEFAULT 'CASH',

    CONSTRAINT "Invoices_pkey" PRIMARY KEY ("invoiceId")
);

-- CreateTable
CREATE TABLE "PartsOrderEntry" (
    "partsOrderEntryId" TEXT NOT NULL,
    "saleDate" TIMESTAMP(3) NOT NULL,
    "partStore" TEXT NOT NULL,
    "skuNumber" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "listPriceInCents" INTEGER NOT NULL,
    "costPriceInCents" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "custLastName" TEXT NOT NULL,
    "custFirstName" TEXT NOT NULL,
    "totalPriceInCents" INTEGER NOT NULL,

    CONSTRAINT "PartsOrderEntry_pkey" PRIMARY KEY ("partsOrderEntryId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Invoices_invoiceNumber_key" ON "Invoices"("invoiceNumber");

-- AddForeignKey
ALTER TABLE "Cars" ADD CONSTRAINT "Cars_customerIdentifierId_fkey" FOREIGN KEY ("customerIdentifierId") REFERENCES "Customers"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoices" ADD CONSTRAINT "Invoices_customerIdenId_fkey" FOREIGN KEY ("customerIdenId") REFERENCES "Customers"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoices" ADD CONSTRAINT "Invoices_customerCarId_fkey" FOREIGN KEY ("customerCarId") REFERENCES "Cars"("carId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoices" ADD CONSTRAINT "Invoices_partsOrderId_fkey" FOREIGN KEY ("partsOrderId") REFERENCES "PartsOrderEntry"("partsOrderEntryId") ON DELETE RESTRICT ON UPDATE CASCADE;
