import { ProductFormModel } from "@entities/product";
import { OrderDto } from "./order.dto";

export interface OrderModel extends Omit<OrderDto, "cart"> {
  products: ProductFormModel[];
}
