"use client";

import { ShoppingCartOutlined } from "@ant-design/icons";
import { routes } from "@shared/consts";
import { ButtonLink } from "@shared/ui";
import { Button, Stepper } from "antd-mobile";
import { FC, useEffect, useState } from "react";

type ProductCardQuantityProps = {
  onQuantityChange: (quantity: number) => void;
  quantity?: number;
  loading: boolean;
};

const ProductCardQuantity: FC<ProductCardQuantityProps> = ({
  onQuantityChange,
  quantity,
  loading,
}) => {
  const [quantityState, setQuantityState] = useState<number>(quantity ?? 0);

  useEffect(() => {
    quantity && setQuantityState(quantity);
  }, [quantity]);

  const handleChangeQuantity = (quantity: number) => {
    onQuantityChange(quantity);
    setQuantityState(quantity);
  };

  if (!quantityState) {
    return (
      <Button
        block
        color="primary"
        size="large"
        onClick={() => handleChangeQuantity(1)}
      >
        Добавить в корзину
      </Button>
    );
  }

  return (
    <div className="flex gap-4">
      <ButtonLink
        color="blueWhite"
        icon={<ShoppingCartOutlined />}
        text="В Корзине"
        link={routes.base.cart.url}
      />
      <Stepper
        style={{
          "--border-inner": "none",
          "--height": "36px",
          "--input-width": "70px",
          "--input-background-color": "var(--adm-color-background)",
          "--active-border": "1px solid #1677ff",
        }}
        className="!w-full"
        value={quantityState}
        onChange={handleChangeQuantity}
        disabled={loading}
      />
    </div>
  );
};

export default ProductCardQuantity;
