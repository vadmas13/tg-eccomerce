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
        <div className="grid grid-cols-[160px_1fr] items-center">
          <span>Статус заказа</span>
          <OrderStateTag state={data.status} />
        </div>
        <div className="grid grid-cols-[160px_1fr] items-center">
          <span>Статус оплаты</span>
          <OrderPaymentStateTag state={data.payementStatus} />
        </div>
        <div className="grid grid-cols-[160px_1fr] items-center ">
          <span>Стоимость заказа</span>
          <ProductPrice price={data.totalPrice} size="middle" />
        </div>
        <div className="grid grid-cols-[160px_1fr]">
          <span>Комментарий к заказу</span>
          <div className="max-w-[160px]">{data.comment}</div>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-md mb-4">
          Доставка{" "}
          <span>
            {
              orderAddressTypeOptions.find((x) => x.value === data.addressType)
                ?.label
            }
          </span>
        </h2>
        <div className="grid grid-cols-[160px_1fr]">
          <span>Адрес</span>
          <div className="max-w-[160px]">{data.address}</div>
        </div>
        <div className="grid grid-cols-[160px_1fr]">
          <span>Получатель</span>
          <div className="max-w-[160px]">
            {data.lastName} {data.firstName} {data.secondName}
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="font-bold text-md">Товары - {data.totalAmount} шт.</h2>
        <div className="mt-4">
          <OrderProducts products={data.products} />
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
