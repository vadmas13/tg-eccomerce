import { Cart, CartItem, Product } from '@prisma/client';

export interface CartResponseModel extends Cart {
    items: (CartItem & { product: Product })[];
    totalQuantity?: number;
    totalPrice?: number;
    totalDiscountPrice?: number;
}
