"use server";

import { backQuery, objectToQueryString } from "@shared/utils";
import { Category } from "../models";
import { PaginationDto, PaginationModel } from "@shared/models";

export const getCategoryById = async (id: string) => {
  return backQuery<Category>(`/category?id=${id}`, "GET");
};

export const getCategoriesBack = async (params?: PaginationModel) => {
  console.log("getCategoriesBack", params?.page);
  return backQuery<PaginationDto<Category[]>>(
    `/category/list${objectToQueryString(params ?? {})}`,
    "GET",
  );
};

export const deleteCategoriesBack = async (categoryId: string) => {
  return backQuery<Category>(`/category?id=${categoryId}`, "DELETE");
};

export const createCategory = async (name: string) => {
  return backQuery<Category>("/category", "POST", { name });
};

export const updateCategory = async (data: { id: string; name: string }) => {
  return backQuery<Category>("/category", "PUT", data);
};
