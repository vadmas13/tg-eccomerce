/*
  Warnings:

  - Added the required column `min_price` to the `product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "product" ADD COLUMN     "min_price" INTEGER NOT NULL;
