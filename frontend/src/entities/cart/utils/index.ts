import { QueryKey } from "@shared/consts";
import { QueryClient } from "@tanstack/react-query";

export const resetCartCashe = (queryClient: QueryClient, userId: string) => {
  return Promise.all([
    queryClient.invalidateQueries({
      queryKey: [QueryKey.UserCartCount, userId],
    }),
    queryClient.invalidateQueries({
      queryKey: [QueryKey.UserCartProductIds, userId],
    }),
    queryClient.invalidateQueries({
      queryKey: [QueryKey.UserCart, userId],
    }),
  ]);
};
