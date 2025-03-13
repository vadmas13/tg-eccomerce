"use client";

import { QueryKey, routes } from "@shared/consts";
import { FC } from "react";
import { createProduct, Product, ProductForm } from "@entities";
import { PaginationDto } from "@shared/models";
import { useRouter } from "next/navigation";
import { useListMutation } from "@shared/hooks";

const ProductCreateForm: FC = () => {
  const router = useRouter();

  const { mutate, isPending } = useListMutation(
    [[QueryKey.ProductListPage, QueryKey.CatalogProductsPage]],
    createProduct,
    (data) => (cash: PaginationDto<Product[]>) => {
      return { ...cash, data: [...(cash?.data ? cash.data : []), data] };
    },
    (data, { showNotification }) => {
      showNotification(`Добавлен товар: ${data.name}`, "success");
      router.push(routes.products.url);
    },
  );

  return (
    <ProductForm
      onFinish={({ removeImageIds, ...dto }, images) => mutate({ dto, images })}
      isPending={isPending}
      isCreate
    />
  );
};

export default ProductCreateForm;
