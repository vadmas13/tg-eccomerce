import { PaginationBase } from '../models';

export const getEntityListPagination = ({ page, pageSize }: PaginationBase) => {
    const skip = pageSize * (page - 1);
    return {
        skip,
        take: pageSize,
    };
};
