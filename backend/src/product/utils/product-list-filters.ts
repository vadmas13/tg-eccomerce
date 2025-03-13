import { isDefined } from '@share';
import { ProductsQueryParams } from '../models';

export const getProductListFilters = (
    params: ProductsQueryParams,
): Partial<Record<string, unknown>> => {
    const baseFilters: Partial<Record<string, unknown>> = {};

    if (isDefined(params.name)) {
        baseFilters.name = { contains: params.name, mode: 'insensitive' };
    }

    if (isDefined(params.categoryIds)) {
        baseFilters.categories = { some: { id: { in: params.categoryIds } } };
    }

    if (isDefined(params.minPrice) || isDefined(params.maxPrice)) {
        baseFilters.price = { gte: params.minPrice, lte: params.maxPrice };
    }

    return baseFilters;
};
