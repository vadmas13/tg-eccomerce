import { OrderStatus } from "../consts";

export interface OrderUpdateState {
  id: string;
  status: OrderStatus;
}
