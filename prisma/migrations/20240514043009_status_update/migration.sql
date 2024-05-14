/*
  Warnings:

  - The values [CANCELLED] on the enum `statusType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "statusType_new" AS ENUM ('PENDING', 'PAID', 'CANCELED');
ALTER TABLE "Invoices" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Invoices" ALTER COLUMN "status" TYPE "statusType_new" USING ("status"::text::"statusType_new");
ALTER TYPE "statusType" RENAME TO "statusType_old";
ALTER TYPE "statusType_new" RENAME TO "statusType";
DROP TYPE "statusType_old";
ALTER TABLE "Invoices" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;
