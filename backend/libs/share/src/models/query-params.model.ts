import { PaginationBase } from './pagination-model';

export interface EntityListQueryParams<T> {
    pagination?: PaginationBase;
    sort?: Partial<{
        [key in keyof T]: 'asc' | 'desc';
    }>;
}
