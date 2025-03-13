import { PaginationBase } from '../models';

export const defaultPagination: PaginationBase = {
    page: 1,
    pageSize: 10,
};

export const mapSortOrderToSortType: Record<string, string> = {
    '1': 'asc',
    '-1': 'desc',
};
