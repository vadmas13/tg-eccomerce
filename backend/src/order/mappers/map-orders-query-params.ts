import { Request } from 'express';
import { OrderQueryParams } from '../models';
import { mapDefaultEntityListParams } from '@share';

export const mapOrdersQueryParams = (queryParams: Request['query']): OrderQueryParams => {
    const filterState = mapDefaultEntityListParams(queryParams);
    const status =
        queryParams.status && typeof queryParams.status === 'string'
            ? queryParams.status.split(',')
            : undefined;
    const payementStatus =
        queryParams.statusPayment && typeof queryParams.statusPayment === 'string'
            ? queryParams.statusPayment.split(',')
            : undefined;
    return {
        ...filterState,
        filter: {
            ...filterState.filter,
            status,
            payementStatus,
            userId: typeof queryParams.userId === 'string' ? queryParams.userId : undefined,
        },
    };
};
