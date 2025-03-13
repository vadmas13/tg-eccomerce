import { getProductByIdBack } from "@entities";
import { QueryKey, routes } from "@shared/consts";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ProductUpdateForm from "./ProductUpdateForm";
import { AdminButtonLink } from "@shared/ui";
import { getIdLink } from "@shared/utils";
import { BankcardOutline } from "antd-mobile-icons";

type ProductPageProps = { id: string };

export default async function ProductPage({ id }: ProductPageProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKey.ProductById, id],
    queryFn: () => getProductByIdBack(id),
  });

  return (
    <div className="card-page">
      {/* <Breadcrumbs items={productPageBreadcrumb} /> */}
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">{routes.products.edit.title}</h1>
        <div className="flex justify-end mb-4">
          <AdminButtonLink
            href={getIdLink(routes.base.catalog.url, id)}
            icon={<BankcardOutline />}
          >
            Карточка товара
          </AdminButtonLink>
        </div>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductUpdateForm productId={id} />
      </HydrationBoundary>
    </div>
  );
}
