import { getProductListBack } from "@entities";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { QueryKey } from "@shared/consts";
import ProductList from "./ProductList";

export default async function ProductListPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [QueryKey.ProductListPage],
    queryFn: () => getProductListBack({ page: 1, pageSize: 10 }),
    initialPageParam: 1,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductList />
      </HydrationBoundary>
    </div>
  );
}
