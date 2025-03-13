"use client";

import { ProductPrice } from "../../../product";
import { CartModel } from "../../models";
import { FC } from "react";
import CartOrderProductsImages from "../CartOrderProductsImages";

type CartOrderProps = {
  data?: CartModel;
};

const CartOrder: FC<CartOrderProps> = ({ data }) => {
  return (
    <div>
      {data && !!data.items.length && (
        <div className="rounded-lg shadow-lg p-4">
          <div className="grid grid-cols-[200px_1fr] items-center">
            <span>Количество товаров:</span>
            <div>{data.totalQuantity}</div>
          </div>
          <div className="grid grid-cols-[200px_1fr] items-center mb-4">
            <span>Стоимость заказа:</span>
            <ProductPrice
              price={data.totalPrice}
              discountedPrice={data.totalDiscountPrice}
              size="middle"
            />
          </div>
          <div>
            <CartOrderProductsImages
              products={data.items.map((x) => x.product)}
              size="small"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartOrder;
