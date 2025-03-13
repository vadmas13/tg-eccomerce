import { CartItem, Product } from '@prisma/client';

export type CartItemModel = CartItem & { product: Product };
