import {
  mapOrderStateToLabel,
  mapPaymentStateToLabel,
} from "@entities/order/consts";
import { getStateActionDataOptions } from "@shared/utils";
import { ActionSheet } from "antd-mobile";
import { FC, useMemo, useState } from "react";

type OrderCardActionsProps = {};

const OrderCardActions: FC<OrderCardActionsProps> = () => {
  const [visibleActions, setVisibleActions] = useState(false);

  const stateActions = useMemo(
    () => getStateActionDataOptions(mapOrderStateToLabel, () => {}),
    [],
  );

  const statePaymentActions = useMemo(
    () => getStateActionDataOptions(mapPaymentStateToLabel, () => {}),
    [],
  );

  return (
    <>
      <ActionSheet
        visible={visibleActions}
        actions={stateActions}
        onClose={() => setVisibleActions(false)}
      />
    </>
  );
};

export default OrderCardActions;
