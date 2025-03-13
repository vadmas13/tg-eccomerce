import { CartOrderProductsImages } from "../../../cart";
import { ProductFormModel, ProductPrice } from "../../../product";
import { FC } from "react";

type OrderProductsProps = {
  products: ProductFormModel[];
};

const OrderProducts: FC<OrderProductsProps> = ({ products }) => {
  return (
    <div className="flex flex-col gap-4">
      {products.map((x) => (
        <div className="flex gap-4 justify-start items-start">
          <CartOrderProductsImages products={[x]} size="middle" />
          <div>
            <div>
              <ProductPrice
                price={x.price}
                discountedPrice={x.discountedPrice}
                size="middle"
              />
              <div className="font-bold">{x.name}</div>
            </div>
            <div className="flex gap-4">{x.addedToCartCount} шт.</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderProducts;
