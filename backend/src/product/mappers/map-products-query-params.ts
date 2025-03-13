import { Request } from 'express';
import { ProductsQueryParams } from '../models';
import { toNumber } from 'lodash';

export const mapProductsQueryParams = (queryParams: Request['query']): ProductsQueryParams => {
    const categoryIds =
        queryParams.categoryIds && typeof queryParams.categoryIds === 'string'
            ? queryParams.categoryIds.split(',')
            : undefined;
    return {
        name: typeof queryParams.name === 'string' ? queryParams.name : undefined,
        page: queryParams.page ? toNumber(queryParams.page) : undefined,
        pageSize: queryParams.pageSize ? toNumber(queryParams.pageSize) : undefined,
        categoryIds,
        minPrice: queryParams.minPrice ? toNumber(queryParams.minPrice) : undefined,
        maxPrice: queryParams.maxPrice ? toNumber(queryParams.maxPrice) : undefined,
    };
};
