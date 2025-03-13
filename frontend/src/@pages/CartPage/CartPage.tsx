import { getUserCart } from "@entities";
import { NextHeaders, QueryKey } from "@shared/consts";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { headers } from "next/headers";
import CartUI from "./CartUI";

export default async function CartPage() {
  const userId = headers().get(NextHeaders.XUserId) as string;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKey.UserCart, userId],
    queryFn: () => getUserCart(userId),
  });

  return (
    <div className="card-page">
      {/* <h1 className="font-bold text-lg mb-5">{routes.base.title}</h1> */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CartUI userId={userId as string} />
      </HydrationBoundary>
    </div>
  );
}
