import { isDefined, isNotDefined } from '@share';
import { OrderQueryParams } from '../models';
import { omitBy } from 'lodash';

export const getOrderListFilters = (params: OrderQueryParams): Partial<Record<string, unknown>> => {
    const baseFilters: Partial<Record<string, unknown>> = { ...params.filter };

    if (isDefined(params.filter.userId)) {
        baseFilters.userId = { contains: params.filter.userId };
    }

    if (isDefined(params.filter.status)) {
        baseFilters.status = { in: params.filter.status };
    }

    if (isDefined(params.filter.payementStatus)) {
        baseFilters.payementStatus = { in: params.filter.payementStatus };
    }

    return omitBy(baseFilters, isNotDefined);
};
