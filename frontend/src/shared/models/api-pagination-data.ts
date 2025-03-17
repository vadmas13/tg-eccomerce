export interface PaginationDto<TData = unknown> {
  data: TData;
  page: number;
  pageSize: number;
  totalCount: number;
  lastPage: number;
}

export interface PaginationModel extends Record<string, unknown> {
  name?: string;
  page?: number;
  pageSize?: number;
  createdAtStart?: string;
  createdAtEnd?: string;
  updatedAtStart?: string;
  updatedAtEnd?: string;
}
