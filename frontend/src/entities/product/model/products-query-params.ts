import { PaginationModel } from "@shared/models";

export interface ProductsQueryParamsFormModel extends PaginationModel {
  categoryIds: string[];
  minPrice: number;
  maxPrice: number;
}

export type ProductsQueryParams = Record<
  keyof ProductsQueryParamsFormModel,
  string
>;
