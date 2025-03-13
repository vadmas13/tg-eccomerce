import {
  mapPaymentStateToColor,
  mapPaymentStateToLabel,
  OrderPaymentState,
} from "../../consts";
import { FC } from "react";

type OrderPaymentStateTagProps = {
  state: OrderPaymentState;
};

const OrderPaymentStateTag: FC<OrderPaymentStateTagProps> = ({ state }) => {
  return (
    <div
      className="py-0 px-2 rounded text-white opacity-60 max-w-[130px] text-center text-sm"
      style={{ background: mapPaymentStateToColor[state] }}
    >
      {mapPaymentStateToLabel[state]}
    </div>
  );
};

export default OrderPaymentStateTag;
