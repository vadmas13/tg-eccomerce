import classNames from "classnames";
import { FC } from "react";

type ProductPriceProps = {
  discountedPrice?: number | null;
  price: number;
  size: "large" | "middle";
};

const ProductPrice: FC<ProductPriceProps> = ({
  price,
  discountedPrice,
  size,
}) => {
  return (
    <div className="flex gap-5 items-center">
      {discountedPrice && (
        <span
          className={classNames("font-bold text-blue-500", {
            ["text-[30px]"]: size === "large",
            ["text-[20px]"]: size === "middle",
          })}
        >
          {discountedPrice} ₽
        </span>
      )}
      <span
        className={classNames("font-bold ", {
          ["text-blue-500"]: !discountedPrice,
          ["text-[30px]"]: size === "large",
          ["text-[20px]"]: size === "middle",
          ["text-gray-400 line-through"]: !!discountedPrice,
          ["!text-[18px]"]: !!discountedPrice && size === "large",
          ["!text-[14px]"]: !!discountedPrice && size === "middle",
        })}
      >
        {price} ₽
      </span>
    </div>
  );
};

export default ProductPrice;
