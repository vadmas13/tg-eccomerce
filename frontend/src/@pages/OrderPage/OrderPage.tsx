"use client";

import { getOrder, OrderCard } from "@entities";
import { QueryKey } from "@shared/consts";
import { query } from "@shared/hoc";
import { FC } from "react";

type OrderPageProps = {
  id: string;
};

const OrderPage: FC<OrderPageProps> = ({ id }) => {
  const OrderCardComp = query(OrderCard, {
    queryKey: [QueryKey.Order, id],
    queryFn: () => getOrder(id),
  });
  return <OrderCardComp />;
};

export default OrderPage;
