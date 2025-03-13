import { Product } from "@entities";
import { getBase64ImageSource } from "@shared/utils";
import { FC } from "react";
import Image from "next/image";

type ProductCardProps = {
  product: Product;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <div>
      <h3>{product.name}</h3>
      <div>
        {product.images?.map((img) => (
          <Image
            alt={""}
            src={getBase64ImageSource(img)}
            width={100}
            height={100}
            layout="intrinsic"
          />
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
