import { PaginationBase } from './pagination-model';

export type EntityListQueryParamsFilterKey<T> = 'createdAt' | 'updatedAt' | keyof T;

export interface EntityListQueryParams<T> {
    pagination?: PaginationBase;
    sort?: Partial<{
        [key in keyof T]: 'asc' | 'desc';
    }>;
    filter: Partial<Record<EntityListQueryParamsFilterKey<T>, any>>;
}
