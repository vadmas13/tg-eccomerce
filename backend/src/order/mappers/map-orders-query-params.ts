import { Request } from 'express';
import { OrderQueryParams } from '../models';
import { mapDefaultEntityListParams } from '@share';

export const mapOrdersQueryParams = (queryParams: Request['query']): OrderQueryParams => {
    return {
        ...mapDefaultEntityListParams(queryParams),
        filter: {
            userId: typeof queryParams.userId === 'string' ? queryParams.userId : undefined,
        },
    };
};
