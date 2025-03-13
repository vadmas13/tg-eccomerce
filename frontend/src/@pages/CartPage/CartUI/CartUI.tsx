"use client";

import { query } from "@shared/hoc";
import { FC } from "react";
import UserCart from "./UserCart";
import { QueryKey } from "@shared/consts";
import { getUserCart, mapCartDto } from "@entities";

type CartUIProps = {
  userId: string;
};

const CartUI: FC<CartUIProps> = ({ userId }) => {
  const UserCartComp = query(UserCart, {
    queryKey: [QueryKey.UserCart, userId],
    queryFn: () => getUserCart(userId),
    mapper: mapCartDto,
  });
  return <UserCartComp userId={userId} />;
};

export default CartUI;
