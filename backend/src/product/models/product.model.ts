import { Product } from '@prisma/client';

export interface ProductModel extends Omit<Product, 'images'> {
    images?: Buffer[];
}
