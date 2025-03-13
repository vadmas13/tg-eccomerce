"use client";

import { ShoppingOutlined } from "@ant-design/icons";
import { UserCartItem, CartModel, ProductPrice } from "@entities";
import { routes } from "@shared/consts";
import { ButtonLink } from "@shared/ui";
import { ShopbagOutline } from "antd-mobile-icons";
import Link from "next/link";
import { FC } from "react";

type UserCartProps = {
  data?: CartModel;
  userId: string;
};

const UserCart: FC<UserCartProps> = ({ data, userId }) => {
  return (
    <div className="card-page">
      <h1 className="font-bold text-lg mb-6">{routes.base.cart.title}</h1>
      {!data?.items.length && (
        <div className="m-auto w-[200px] text-center">
          <div className="mb-4">Корзина пуста</div>
          <Link
            href={routes.base.url}
            className="flex items-center gap-2 !w-full justify-center bg-blue-500 rounded text-white p-2"
          >
            <ShopbagOutline className="text-[20px]" />
            <span className="text-[14px]">Перейти в каталог</span>
          </Link>
        </div>
      )}
      <div>
        {data?.items.map((x) => (
          <UserCartItem key={x.id} cartItem={x} userId={userId} />
        ))}
      </div>
      {data && !!data.items.length && (
        <div className="rounded-lg shadow-lg mt-6 p-4">
          <div className="grid grid-cols-[200px_1fr] items-center">
            <span>Количество товаров:</span>
            <div>{data.totalQuantity}</div>
          </div>
          <div className="grid grid-cols-[200px_1fr] items-center mb-4">
            <span>Стоимость заказа:</span>
            <ProductPrice
              price={data.totalPrice}
              discountedPrice={data.totalDiscountPrice}
              size="middle"
            />
          </div>
          <ButtonLink
            color="blueDark"
            icon={<ShoppingOutlined />}
            text="Перейти к оформлению заказа"
            link={routes.base.order.create.url}
          />
        </div>
      )}
    </div>
  );
};

export default UserCart;
