import {
  mapOrderStateToColor,
  mapOrderStateToLabel,
  OrderStatus,
} from "../../consts";
import { FC } from "react";

type OrderStateTagProps = {
  state: OrderStatus;
};

const OrderStateTag: FC<OrderStateTagProps> = ({ state }) => {
  return (
    <div
      className="py-0 px-2 rounded text-white opacity-60 max-w-[130px] text-center text-sm"
      style={{ background: mapOrderStateToColor[state] }}
    >
      {mapOrderStateToLabel[state]}
    </div>
  );
};

export default OrderStateTag;
