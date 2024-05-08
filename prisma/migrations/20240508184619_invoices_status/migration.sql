-- CreateEnum
CREATE TYPE "statusType" AS ENUM ('PENDING', 'PAID');

-- AlterTable
ALTER TABLE "Invoices" ADD COLUMN     "status" "statusType" NOT NULL DEFAULT 'PENDING';
