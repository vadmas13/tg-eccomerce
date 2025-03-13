"use client";

import { ProductFormModel, resetCartCashe } from "@entities";
import { FC } from "react";
import ProductCardUI from "./ProductCardUI";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCartItem } from "@entities/cart/api";
import { QueryKey } from "@shared/consts";

type CatalogProductCardProps = {
  data?: ProductFormModel;
  isAdmin: boolean;
  userId: string;
};

const CatalogProductCard: FC<CatalogProductCardProps> = ({
  data,
  isAdmin,
  userId,
}) => {
  const queryClient = useQueryClient();
  const { mutate: addToCart, isPending } = useMutation({
    mutationFn: addToCartItem,
    onSuccess: async () => {
      await resetCartCashe(queryClient, userId);
      await queryClient.invalidateQueries({
        queryKey: [QueryKey.ProductById, data?.id],
      });
    },
  });

  const handleAddToCart = (quantity: number) => {
    data?.id && addToCart({ productId: data.id, userId: userId, quantity });
  };
  return (
    <ProductCardUI
      data={data}
      isAdmin={isAdmin}
      loading={isPending}
      onQuantityChange={handleAddToCart}
    />
  );
};

export default CatalogProductCard;
