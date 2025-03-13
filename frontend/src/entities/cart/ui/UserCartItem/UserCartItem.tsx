"use client";

import { ProductFormModel, ProductPrice } from "@entities/product";
import { CartItemDto } from "../../models";
import { FC, useMemo } from "react";
import Image from "next/image";
import { Button, Dialog, Stepper } from "antd-mobile";
import { useNotificationMutation } from "@features";
import { removeFromCartItem } from "../../api";
import { useQueryClient } from "@tanstack/react-query";
import { resetCartCashe } from "../../utils";
import { QueryKey, routes } from "@shared/consts";
import { DeleteOutline } from "antd-mobile-icons";
import Link from "next/link";
import { getIdLink } from "@shared/utils";

type UserCartItemProps = {
  cartItem: CartItemDto<ProductFormModel>;
  userId: string;
};

const UserCartItem: FC<UserCartItemProps> = ({ cartItem, userId }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useNotificationMutation({
    mutationFn: removeFromCartItem,
    onSuccess: async () => {
      await resetCartCashe(queryClient, userId);
      await queryClient.resetQueries({
        queryKey: [QueryKey.ProductById, cartItem.productId],
      });
    },
  });

  const productAvatar = useMemo(
    () =>
      cartItem.product.images?.find(
        (x) => x.key === cartItem.product.avatarCustomId,
      ),
    [cartItem.product.avatarCustomId],
  );

  const handleChangeQuantity = (quantity: number, removeAll?: boolean) => {
    mutate({
      userId: userId,
      productId: cartItem.productId,
      quantity,
      removeAll,
    });
  };

  const handleDeleteItem = async () => {
    await Dialog.confirm({
      content: `Вы действительно хотите удалить товар "${cartItem.product.name}"?`,
      onConfirm: () => handleChangeQuantity(0, true),
      confirmText: "Да",
      cancelText: "Нет",
    });
  };

  return (
    <div className="rounded-lg border border-gray-100 grid grid-cols-[100px_1fr] gap-4 p-4">
      <Link href={getIdLink(routes.base.catalog.url, cartItem.productId)}>
        <div className="w-[100px] h-[100px] relative">
          <Image
            fill
            src={productAvatar?.url ?? "/404-image.jpg"}
            alt={productAvatar?.url ?? "404-image"}
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </Link>
      <div className="flex flex-col justify-between">
        <div>
          <ProductPrice
            price={cartItem.product.price}
            discountedPrice={cartItem.product.discountedPrice}
            size="middle"
          />
          <div className="font-bold">{cartItem.product.name}</div>
        </div>
        <div className="flex gap-4">
          <Button
            color="danger"
            size="large"
            fill="outline"
            className="!p-1 !w-9 !h-9 !flex !justify-center !items-center"
            onClick={handleDeleteItem}
          >
            <DeleteOutline />
          </Button>
          <div className="w-[120px]">
            <Stepper
              style={{
                "--border-inner": "none",
                "--height": "36px",
                "--input-width": "70px",
                "--input-background-color": "var(--adm-color-background)",
                "--active-border": "1px solid #1677ff",
              }}
              className="!w-full"
              value={cartItem.quantity}
              onChange={handleChangeQuantity}
              disabled={isPending}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCartItem;
