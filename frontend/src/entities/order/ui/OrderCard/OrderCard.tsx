import { formatDate } from "@shared/utils";
import { OrderModel } from "../../models";
import { FC } from "react";
import {
  OrderProducts,
  ProductPrice,
  orderAddressTypeOptions,
} from "@entities";
import OrderStateTag from "../OrderStateTag";
import OrderPaymentStateTag from "../OrderPaymentStateTag";

type OrderCardProps = {
  data?: OrderModel;
};

const OrderCard: FC<OrderCardProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  return (
    <div>
      <div className="flex gap-4 items-end">
        <h2 className="text-lg">
          Заказ № <span className="font-bold ">{data.orderTrackId}</span>
        </h2>
        <div> от {formatDate(data.createdAt)}</div>
      </div>
      <div className="mt-5 mb-4 flex flex-col gap-2">
        <div className="grid grid-cols-[200px_1fr] items-center">
          <span>Статус заказа:</span>
          <OrderStateTag state={data.status} />
        </div>
        <div className="grid grid-cols-[200px_1fr] items-center">
          <span>Статус оплаты:</span>
          <OrderPaymentStateTag state={data.payementStatus} />
        </div>
        <div className="grid grid-cols-[200px_1fr] items-center">
          <span>Количество товаров:</span>
          <div>{data.totalAmount}</div>
        </div>
        <div className="grid grid-cols-[200px_1fr] items-center ">
          <span>Стоимость заказа:</span>
          <ProductPrice price={data.totalPrice} size="middle" />
        </div>
        <div className="grid grid-cols-[200px_1fr]">
          <span>Комментарий к заказу:</span>
          <div className="max-w-[200px]">{data.comment}</div>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-md">Товары</h2>
        <div className="mt-4">
          <OrderProducts products={data.products} />
        </div>
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-md mb-4">Доставка</h2>
        {
          orderAddressTypeOptions.find((x) => x.value === data.addressType)
            ?.label
        }{" "}
        по адресу {data.address}
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-md mb-4">Получатель</h2>
        <div className="grid grid-cols-[200px_1fr]">
          <span>Имя:</span>
          <div className="max-w-[200px]">{data.firstName}</div>
        </div>
        <div className="grid grid-cols-[200px_1fr]">
          <span>Фамилия:</span>
          <div className="max-w-[200px]">{data.lastName}</div>
        </div>
        <div className="grid grid-cols-[200px_1fr]">
          <span>Отчество:</span>
          <div className="max-w-[200px]">{data.secondName}</div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
