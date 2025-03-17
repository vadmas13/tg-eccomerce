"use client";

import {
  CartOrder,
  createOrder,
  getUser,
  getUserCart,
  mapCartDto,
  OrderCreateForm,
  OrderCreateFormModel,
  resetCartCashe,
} from "@entities";
import { useNotificationMutation } from "@features";
import { QueryKey, routes } from "@shared/consts";
import { query } from "@shared/hoc";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

type CreateOrderPageUIProps = {
  userId: string;
};

const CreateOrderPageUI: FC<CreateOrderPageUIProps> = ({ userId }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isPending } = useNotificationMutation({
    mutationFn: createOrder,
    successMessage:
      "Заказ успешно создан! Теперь вы можете отслеживать свой заказ в разделе 'Заказы'",
    onSuccess: async () => {
      await resetCartCashe(queryClient, userId);
      await queryClient.invalidateQueries({
        queryKey: [QueryKey.OrderAll],
        exact: false,
      });
      await queryClient.invalidateQueries({
        queryKey: [QueryKey.OrderList],
        exact: false,
      });
      router.push(routes.base.url);
    },
  });

  const handleCreate = (dto: OrderCreateFormModel) => {
    mutate({ ...dto, userId });
  };

  const CartOrderComp = query(CartOrder, {
    queryKey: [QueryKey.UserCart, userId],
    queryFn: () => getUserCart(userId),
    mapper: mapCartDto,
  });

  const OrderCreateFormComp = query(OrderCreateForm, {
    queryKey: [QueryKey.UserInfo, userId],
    queryFn: () => getUser(userId),
  });

  return (
    <div>
      <div className="mt-4">
        <h2 className="font-bold text-md">Ваш заказ</h2>
        <CartOrderComp />
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-md">Данные для оформления</h2>
        <OrderCreateFormComp isPending={isPending} onFinish={handleCreate} />
      </div>
    </div>
  );
};

export default CreateOrderPageUI;
