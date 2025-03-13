import { CartDto } from "@entities/cart";
import { OrderAddressType, OrderPaymentState, OrderStatus } from "../consts";

export interface OrderDto {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  secondName?: string;
  cartId: string;
  status: OrderStatus;
  payementStatus: OrderPaymentState;
  totalAmount: number;
  totalPrice: number;
  address: string;
  addressType: OrderAddressType;
  createdAt: string;
  updatedAt: string;
  orderTrackId: number;
  cart: CartDto;
  comment: string;
}
