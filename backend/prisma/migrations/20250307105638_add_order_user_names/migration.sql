/*
  Warnings:

  - Added the required column `first_name` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "second_name" TEXT;
