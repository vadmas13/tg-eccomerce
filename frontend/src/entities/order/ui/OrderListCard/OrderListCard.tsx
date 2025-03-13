"use client";

import { ProductPrice } from "@entities/product";
import { OrderModel } from "../../models";
import { FC } from "react";
import { formatDate } from "@shared/utils";
import OrderStateTag from "../OrderStateTag";

type OrderListCardProps = {
  order: OrderModel;
};

const OrderListCard: FC<OrderListCardProps> = ({ order }) => {
  return (
    <div>
      <div className="flex flex-col gap-1 justify-center">
        <div className="flex gap-2 items-center flex-wrap">
          <span className="font-bold">Заказ №:</span>
          <div>{order.orderTrackId},</div>
          <div>от {formatDate(order.createdAt)}</div>
          <OrderStateTag state={order.status} />
        </div>
        <div className="flex gap-4 items-center">
          <ProductPrice price={order.totalPrice} size="middle" />
          <span>(Товаров: {order.totalAmount})</span>
        </div>
      </div>
    </div>
  );
};

export default OrderListCard;
