export interface ProductsQueryParams {
    name?: string;
    page?: number;
    pageSize?: number;
    categoryIds?: string[];
    minPrice?: number;
    maxPrice?: number;
}
