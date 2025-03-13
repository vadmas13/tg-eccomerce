"use client";

import { getProductByIdBack, mapProductInfo } from "@entities";
import { QueryKey } from "@shared/consts";
import { query } from "@shared/hoc";
import { FC } from "react";
import CatalogProductCard from "./CatalogProductCard";

type ProductUpdateFormProps = {
  productId: string;
  isAdmin: boolean;
  userId: string;
};

const CatalogProduct: FC<ProductUpdateFormProps> = ({
  productId,
  isAdmin,
  userId,
}) => {
  const ProductCardComp = query(CatalogProductCard, {
    queryKey: [QueryKey.ProductById, productId],
    queryFn: () => getProductByIdBack(productId),
    mapper: (d) => mapProductInfo(d),
  });

  return <ProductCardComp isAdmin={isAdmin} userId={userId} />;
};

export default CatalogProduct;
