import { getProductByIdBack } from "@entities";
import { NextHeaders, QueryKey } from "@shared/consts";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import CatalogProduct from "./ui";
import { checkAdmin } from "@shared/utils";
import { headers } from "next/headers";

type CatalogProductPageProps = { id: string };

export default async function CatalogProductPage({
  id,
}: CatalogProductPageProps) {
  const isAdmin = checkAdmin(headers());
  const userId = headers().get(NextHeaders.XUserId);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKey.ProductById, id],
    queryFn: () => getProductByIdBack(id),
  });

  return (
    <div className="card-page">
      {/* <h1 className="font-bold text-lg mb-5">{routes.base.title}</h1> */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CatalogProduct
          productId={id}
          isAdmin={isAdmin}
          userId={userId as string}
        />
      </HydrationBoundary>
    </div>
  );
}
