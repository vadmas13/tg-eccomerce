import { mapDocumentInfo } from "@entities/document";
import { CatalogProductModel, Product, ProductFormModel } from "../model";

export const mapProductInfo = (
  { categories, documents, cartItems, ...dto }: Product,
  quantity?: number,
): ProductFormModel => {
  const categoryIds = categories?.map((x) => x.id);
  const images = documents?.map(mapDocumentInfo);
  console.log("cartItems", cartItems);
  return {
    ...dto,
    categoryIds,
    images,
    categories,
    addedToCartCount:
      quantity ??
      cartItems?.reduce((res, curr) => {
        if (dto.id === curr.productId) {
          res += curr.quantity;
        }
        return res;
      }, 0),
  };
};

export const mapCatalogProductInfo = ({
  documents,
  ...dto
}: Product): CatalogProductModel => {
  const images = documents.map(mapDocumentInfo);
  return {
    ...dto,
    images,
  };
};
