import { Order } from '@prisma/client';
import { EntityListQueryParams } from '@share';

export interface OrderQueryParams extends EntityListQueryParams<Order> {
    filter: {
        userId?: string;
    };
}
