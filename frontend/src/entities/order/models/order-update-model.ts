import { OrderPaymentState, OrderStatus } from "../consts";

export interface OrderUpdateState {
  id: string;
  status: OrderStatus;
}

export interface OrderUpdatePaymentState {
  id: string;
  status: OrderPaymentState;
}
