"use client";

import {
  addToCartItem,
  CatalogProductModel,
  ProductPrice,
  resetCartCashe,
} from "@entities";
import { ImageSlider } from "@shared/ui";
import { FC } from "react";
import classNames from "classnames";
import styles from "./styles.module.scss";
import { Button, Ellipsis } from "antd-mobile";
import Link from "next/link";
import { getIdLink } from "@shared/utils";
import { QueryKey, routes } from "@shared/consts";
import { PlusOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useNotificationMutation } from "@features";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type CatalogProductCardProps = {
  product: CatalogProductModel;
  addedToCart?: boolean;
  loading: boolean;
  userId: string;
};

const CatalogProductCard: FC<CatalogProductCardProps> = ({
  product,
  addedToCart,
  loading,
  userId,
}) => {
  //console.log("addedToCart", addedToCart);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useNotificationMutation({
    mutationFn: addToCartItem,
    onSuccess: () => {
      resetCartCashe(queryClient, userId);
      queryClient.resetQueries({
        queryKey: [QueryKey.ProductById, product.id],
      });
    },
  });

  const handleAddCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (addedToCart) {
      router.push(routes.base.cart.url);
      return;
    }
    mutate({ productId: product.id, userId, quantity: 1 });
  };

  return (
    <Link
      href={getIdLink(routes.base.catalog.url, product.id)}
      className={classNames(
        "border rounded-lg shadow-lg overflow-hidden transition-transform transform",
        styles.catalogProductCard,
      )}
    >
      <div className={styles.catalogImageSlider}>
        <ImageSlider images={product.images} />
      </div>
      <div className="p-2 pr-4 pl-4">
        <ProductPrice
          price={product.price}
          discountedPrice={product.discountedPrice}
          size="middle"
        />
        <Ellipsis
          direction="end"
          className="text-md font-semibold text-gray-800"
          content={product.name}
        />
        <Button
          className={classNames(
            "rounded-lg flex justify-center items-center p-2 mr-4 ml-4 w-full !mt-2 !text-[14px]",
            {
              ["!bg-blue-100 !text-blue-500"]: addedToCart,
            },
            {
              ["!bg-blue-500 !text-white"]: !addedToCart,
            },
          )}
          loading={loading || isPending}
          onClick={handleAddCart}
        >
          {addedToCart ? (
            <Link
              href={routes.base.cart.url}
              className="flex items-center gap-2 !w-full justify-center"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <ShoppingCartOutlined className="text-[20px]" />
              <span> В Корзине</span>
            </Link>
          ) : (
            <div
              className="!text-white flex items-center justify-center !gap-2 !bg-transparent !text-[14px]
            !p-0 !m-0 !border-none !active:bg-transparent !focus:bg-transparent"
            >
              <PlusOutlined className="!text-[20px]" />
              <span>В корзину</span>
            </div>
          )}
        </Button>
      </div>
    </Link>
  );
};

export default CatalogProductCard;
