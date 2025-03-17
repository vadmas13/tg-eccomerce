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
        filter: {
            ...(queryParams.createdAtStart || queryParams.createdAtEnd
                ? createDateFilter(
                      'createdAt',
                      queryParams.createdAtStart?.toString(),
                      queryParams.createdAtEnd?.toString(),
                  )
                : {}),
            ...(queryParams.updatedAtStart || queryParams.updatedAtEnd
                ? createDateFilter(
                      'updatedAt',
                      queryParams.updatedAtStart?.toString(),
                      queryParams.updatedAtEnd?.toString(),
                  )
                : { undefined }),
        } as any,
    };
};

export const createDateFilter = (dateField: string, startDate?: string, endDate?: string) => {
    const filter: Record<string, any> = {};

    const setStartOfDay = (date: string) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        return d.toISOString();
    };

    const setEndOfDay = (date: string) => {
        const d = new Date(date);
        d.setHours(23, 59, 59, 999);
        return d.toISOString();
    };

    if (startDate && endDate) {
        filter[dateField] = {
            gte: setStartOfDay(startDate),
            lte: setEndOfDay(endDate),
        };
    } else if (startDate) {
        filter[dateField] = {
            gte: setStartOfDay(startDate),
            lte: setEndOfDay(startDate),
        };
    } else if (endDate) {
        filter[dateField] = {
            gte: setStartOfDay(endDate),
            lte: setEndOfDay(endDate),
        };
    }

    return filter;
};
