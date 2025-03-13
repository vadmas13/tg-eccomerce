/*
  Warnings:

  - A unique constraint covering the columns `[cartId]` on the table `cart_item` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[productId]` on the table `cart_item` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cart_item_cartId_key" ON "cart_item"("cartId");

-- CreateIndex
CREATE UNIQUE INDEX "cart_item_productId_key" ON "cart_item"("productId");
