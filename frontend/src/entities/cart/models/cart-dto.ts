import { Product, ProductFormModel } from "../../product";

export interface CartDto {
  id: string;
  userId: string;
  items: CartItemDto<Product>[];
  totalDiscountPrice: number;
  totalPrice: number;
  totalQuantity: number;
}

export interface CartItemDto<TProduct> {
  id: string;
  cartId: string;
  productId: string;
  quantity: number;
  orderId?: string;
  product: TProduct;
}

export type CartModel = Omit<CartDto, "items"> & {
  items: CartItemDto<ProductFormModel>[];
};
