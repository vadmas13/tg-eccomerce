"use client";

import { OrderAddressType, orderAddressTypeOptions } from "../../consts";
import { Selector, TextArea } from "antd-mobile";
import { FC, useState } from "react";

type OrderAddressFormProps = {
  setFieldValue: (name: string, value: any) => void;
};

const OrderAddressForm: FC<OrderAddressFormProps> = ({ setFieldValue }) => {
  const [type, setType] = useState<OrderAddressType>(OrderAddressType.SDEK);

  return (
    <div>
      <Selector
        options={orderAddressTypeOptions}
        defaultValue={[type]}
        value={[type]}
        onChange={(arr) => {
          setFieldValue("addressType", arr[0]);
          setType(arr[0]);
        }}
      />
      <div className="mt-4">
        <TextArea
          onChange={(v) => setFieldValue("address", v)}
          placeholder={
            type === OrderAddressType.SDEK
              ? "Введите полный адрес доставки CДЭК"
              : "Введите полный адрес доставки Почты России"
          }
        />
      </div>
    </div>
  );
};

export default OrderAddressForm;
