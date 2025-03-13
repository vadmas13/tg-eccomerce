import { ProductFormModel } from "./product-form-model";
import { Product } from "./product-model";

export type CatalogProductModel = Omit<Product, "documents"> &
  Pick<ProductFormModel, "images">;
