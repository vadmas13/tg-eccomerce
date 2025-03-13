"use client";

import { deleteOrder, getAllOrders, OrderListCard } from "@entities";
import { QueryKey, routes } from "@shared/consts";
import { QueryEntityList } from "@widgets";

const OrdersListPage = () => {
  return (
    <>
      <QueryEntityList
        title="Заказы"
        deleteMutation={{
          fn: deleteOrder,
          queryKeys: [
            [QueryKey.Order],
            [QueryKey.OrderAll],
            [QueryKey.OrderList],
          ],
        }}
        queryOptions={{
          mapper: (x) => ({
            titleNode: <OrderListCard order={x} />,
            title: x.id,
            url: x.id,
            id: x.id,
          }),
          getQueryKeys: (n) => [QueryKey.OrderAll, n ?? ""],
          queryFn: getAllOrders,
        }}
        actions={{
          editBaseUrl: routes.orders.edit.url,
        }}
      />
    </>
  );
};

export default OrdersListPage;
