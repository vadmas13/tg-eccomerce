"use server";

import { PaginationDto, PaginationModel } from "@shared/models";
import { backQuery, objectToQueryString } from "@shared/utils";
import { Product } from "../model";

export const getProductListBack = async (params?: PaginationModel) => {
  return backQuery<PaginationDto<Product[]>>(
    `/product/list${objectToQueryString(params ?? {}, {
      arrayValueWillBeJoined: true,
    })}`,
    "GET",
  );
};

export const getProductByIdBack = async (id: string) => {
  return backQuery<Product>(`/product?id=${id}`, "GET");
};

export const deleteProductBack = async (productId: string) => {
  return backQuery<Product>(`/product?id=${productId}`, "DELETE");
};
