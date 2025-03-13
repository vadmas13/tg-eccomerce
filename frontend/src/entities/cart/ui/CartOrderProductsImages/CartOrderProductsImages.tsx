"use client";

import Link from "next/link";
import Image from "next/image";
import { ProductFormModel } from "../../../product";
import { FC, useMemo } from "react";
import { getIdLink } from "@shared/utils";
import { routes } from "@shared/consts";

type CartOrderProductsImagesProps = {
  products: ProductFormModel[];
  size: "small" | "middle";
};

const CartOrderProductsImages: FC<CartOrderProductsImagesProps> = ({
  products,
  size,
}) => {
  const sizePx = size === "small" ? 50 : 100;

  const productImages = useMemo(
    () =>
      products.map((x) => ({
        avatar: x.images?.find((xx) => xx.key === x.avatarCustomId),
        productId: x.id,
      })),
    [products],
  );
  return (
    <div className="flex gap-2">
      {productImages.map((x) => (
        <Link
          className="block"
          href={getIdLink(routes.base.catalog.url, x.productId!)}
          style={{ width: sizePx, height: sizePx }}
        >
          <div className="relative" style={{ width: sizePx, height: sizePx }}>
            <Image
              fill
              src={x.avatar?.url ?? "/404-image.jpg"}
              alt={x.avatar?.url ?? "404-image"}
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default CartOrderProductsImages;
