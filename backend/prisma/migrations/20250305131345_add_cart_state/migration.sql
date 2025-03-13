-- CreateEnum
CREATE TYPE "CartState" AS ENUM ('CURRENT', 'ORDERED');

-- AlterTable
ALTER TABLE "cart" ADD COLUMN     "state" "CartState" NOT NULL DEFAULT 'CURRENT';
