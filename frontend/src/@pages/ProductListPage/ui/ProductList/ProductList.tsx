"use client";

import { deleteProductBack, getProductListBack } from "@entities";
import { QueryKey, routes } from "@shared/consts";
import { QueryEntityList } from "@widgets";
import { FC } from "react";
import ProductCard from "./ProductCard";

const ProductList: FC = () => {
  return (
    <>
      <QueryEntityList
        title="Товары"
        deleteMutation={{
          fn: deleteProductBack,
          queryKeys: [[QueryKey.ProductListPage]],
        }}
        queryOptions={{
          mapper: (x) => ({
            titleNode: <ProductCard product={x} />,
            title: x.name,
            url: x.id,
            id: x.id,
          }),
          getQueryKeys: (n) => [QueryKey.ProductListPage, n ?? ""],
          queryFn: getProductListBack,
        }}
        actions={{
          createUrl: routes.products.create.url,
          editBaseUrl: routes.products.edit.url,
        }}
      />
    </>
  );
};

export default ProductList;
