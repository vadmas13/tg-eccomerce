export enum OrderPaymentState {
  Paid = "PAID",
  NotPaid = "NOT_PAID",
}

export const mapPaymentStateToColor: Record<OrderPaymentState, string> = {
  [OrderPaymentState.Paid]: "green",
  [OrderPaymentState.NotPaid]: "red",
};

export const mapPaymentStateToLabel: Record<OrderPaymentState, string> = {
  [OrderPaymentState.Paid]: "Оплачено",
  [OrderPaymentState.NotPaid]: "Не оплачено",
};
