import { mapProductInfo } from "@entities/product";
import { OrderDto, OrderModel } from "../models";

export const mapOrderInfo = ({ cart, ...dto }: OrderDto): OrderModel => ({
  ...dto,
  products: cart.items.map((x) => mapProductInfo(x.product, x.quantity)),
});
