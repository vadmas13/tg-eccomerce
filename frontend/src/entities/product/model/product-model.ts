import { Document } from "../../document";
import { Category } from "../../categories";
import { CartItemDto } from "@entities/cart/models";

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  discountedPrice: number;
  updatedAt: string;
  createdAt: string;
  categories: Category[];
  documents: Document[];
  cartItems: CartItemDto<Product>[];
}
