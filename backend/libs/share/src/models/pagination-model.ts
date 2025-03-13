export interface PaginationModel<TData> extends PaginationBase {
    data: TData;
    totalCount: number;
    lastPage: number;
}

export interface PaginationBase {
    page?: number;
    pageSize?: number;
}
