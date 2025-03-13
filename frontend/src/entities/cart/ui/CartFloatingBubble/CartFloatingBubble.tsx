"use client";

import { ShoppingCartOutlined } from "@ant-design/icons";
import { getCartCount } from "../../api";
import { QueryKey, routes } from "@shared/consts";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "antd-mobile";
import { FC } from "react";
import { useRouter } from "next/navigation";

type CartFloatingBubbleProps = {
  userId: string | null;
};

const CartFloatingBubble: FC<CartFloatingBubbleProps> = ({ userId }) => {
  const router = useRouter();

  const { data: cartCount } = useQuery({
    queryKey: [QueryKey.UserCartCount, userId],
    queryFn: () => getCartCount(userId!),
    enabled: !!userId,
  });

  const onClick = () => {
    router.push(routes.base.cart.url);
  };

  if (!cartCount) {
    return null;
  }

  return (
    <div
      onClick={onClick}
      className="fixed right-[20px] bottom-[60px] bg-white shadow-lg
      rounded-full cursor-pointer active:bg-gray-100
      w-[50px] h-[50px] flex items-center justify-center"
    >
      <Badge content={cartCount}>
        <ShoppingCartOutlined className="text-[28px] text-blue-400" />
      </Badge>
    </div>
  );
};

export default CartFloatingBubble;
