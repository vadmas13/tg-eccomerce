import { getProductListBack } from "@entities";
import { NextHeaders, QueryKey } from "@shared/consts";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CatalogProductList from "./CatalogProductList";
import { headers } from "next/headers";

export default async function CatalogProductsPage() {
  const queryClient = new QueryClient();
  const userId = headers().get(NextHeaders.XUserId);

  await queryClient.prefetchInfiniteQuery({
    queryKey: [QueryKey.CatalogProductsPage],
    queryFn: () => getProductListBack({ page: 1, pageSize: 10 }),
    initialPageParam: 1,
  });

  return (
    <div className="card-page">
      {/* <h1 className="font-bold text-lg mb-5">{routes.base.title}</h1> */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CatalogProductList userId={userId as string} />
      </HydrationBoundary>
    </div>
  );
}
