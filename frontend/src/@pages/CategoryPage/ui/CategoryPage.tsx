import { getCategoryById } from "@entities";
import { QueryKey, routes } from "@shared/consts";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CategoryUpdateForm from "./CategoryUpdateForm";

type CategoryPageProps = {
  id: string;
};

export default async function CategoryPage({ id }: CategoryPageProps) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKey.CategoryById, id],
    queryFn: () => getCategoryById(id),
  });

  return (
    <div className="card-page">
      {/* <Breadcrumbs items={categoryPageBreadcrumb} /> */}
      <h1 className="font-bold text-lg">{routes.categories.edit.title}</h1>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CategoryUpdateForm categoryId={id} />
      </HydrationBoundary>
    </div>
  );
}
