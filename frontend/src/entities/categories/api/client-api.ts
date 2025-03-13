import { clientApi } from "@shared/utils";
import { Category } from "../models";
import { PaginationDto, PaginationModel } from "@shared/models";

export const getCategoriesClient = async (params?: PaginationModel) =>
  clientApi
    .get<PaginationDto<Category[]>>("/category/list", { params })
    ?.then((x) => x.data);
