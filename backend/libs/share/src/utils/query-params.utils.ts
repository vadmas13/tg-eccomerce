import { EntityListQueryParams } from '../models';
import { defaultPagination, mapSortOrderToSortType } from '../consts';
import { Request } from 'express';
import { toNumber } from 'lodash';

export const mapDefaultEntityListParams = <T>(
    queryParams: Request['query'],
): EntityListQueryParams<T> => {
    const sortFieldName = queryParams.sortBy ?? queryParams.sortField;
    const sortOrder =
        queryParams.sortType ??
        (queryParams.sortOrder
            ? mapSortOrderToSortType[queryParams.sortOrder.toString()]
            : undefined);
    return {
        pagination: {
            page: queryParams.page ? toNumber(queryParams.page) : defaultPagination.page,
            pageSize: queryParams.pageSize
                ? toNumber(queryParams.pageSize)
                : defaultPagination.pageSize,
        },
        sort: (sortFieldName
            ? {
                  [sortFieldName.toString()]: sortOrder ?? 'asc',
              }
            : {
                  createdAt: 'desc',
              }) as EntityListQueryParams<T>['sort'],
    };
};
