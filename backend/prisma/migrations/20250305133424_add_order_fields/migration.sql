/*
  Warnings:

  - Added the required column `address` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressType` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderAddressType" AS ENUM ('SDEK', 'RU_POST');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "addressType" "OrderAddressType" NOT NULL,
ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;
