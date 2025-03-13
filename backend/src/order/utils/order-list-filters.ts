import { isDefined } from '@share';
import { OrderQueryParams } from '../models';

export const getOrderListFilters = (params: OrderQueryParams): Partial<Record<string, unknown>> => {
    const baseFilters: Partial<Record<string, unknown>> = {};

    if (isDefined(params.filter.userId)) {
        baseFilters.userId = { contains: params.filter.userId };
    }

    return baseFilters;
};
