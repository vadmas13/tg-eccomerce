-- CreateEnum
CREATE TYPE "OrderPaymentState" AS ENUM ('PAID', 'NOT_PAID');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "payementStatus" "OrderPaymentState" NOT NULL DEFAULT 'NOT_PAID';
