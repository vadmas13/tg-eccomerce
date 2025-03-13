import { getCategoriesBack } from "@entities";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CategoriesList from "./ui/CategoriesList";
import { QueryKey } from "@shared/consts";

export default async function CategoriesListPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [QueryKey.CategoriesListPage],
    queryFn: () => getCategoriesBack({ page: 1, pageSize: 10 }),
    initialPageParam: 1,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoriesList />
      </HydrationBoundary>
    </div>
  );
}
