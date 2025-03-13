"use client";

import { QueryKey, routes } from "@shared/consts";
import { FC } from "react";
import {
  getProductByIdBack,
  mapProductInfo,
  Product,
  ProductForm,
  updateProduct,
} from "@entities";
import { useRouter } from "next/navigation";
import { useListMutation } from "@shared/hooks";
import { query } from "@shared/hoc";

type ProductUpdateFormProps = {
  productId: string;
};

const ProductUpdateForm: FC<ProductUpdateFormProps> = ({ productId }) => {
  const router = useRouter();

  const { mutate, isPending } = useListMutation(
    [
      [QueryKey.ProductListPage],
      [QueryKey.ProductById, productId],
      [QueryKey.CatalogProductsPage],
    ],
    updateProduct,
    (data: Product) => (result: Product[] | Product) => {
      if (Array.isArray(result)) {
        return [...result].map((x) => (x.id === productId ? data : x));
      }
      return { ...data, ...result };
    },
    (data, { showNotification }) => {
      showNotification(`Обновлен товар: ${data.name}`, "success");
      router.push(routes.products.url);
    },
  );

  const ProductFormComp = query(ProductForm, {
    queryKey: [QueryKey.ProductById, productId],
    queryFn: () => getProductByIdBack(productId),
    mapper: (d) => mapProductInfo(d),
  });

  return (
    <ProductFormComp
      onFinish={(dto, images) => {
        return mutate({
          dto: { ...dto, id: productId },
          images,
        });
      }}
      isPending={isPending}
    />
  );
};

export default ProductUpdateForm;
