"use client";

import {
  CatalogProductCard,
  CatalogProductModel,
  getProductListBack,
  mapCatalogProductInfo,
  Product,
} from "@entities";
import { getUserCartProductIds } from "@entities";
import { QueryKey, typography } from "@shared/consts";
import { useAppSelector } from "@shared/hooks";
import { PaginationDto } from "@shared/models";
import { QueryPaginationContainer } from "@shared/ui";
import { objectToQueryString } from "@shared/utils";
import { useQuery } from "@tanstack/react-query";
import { InfiniteScroll, PullToRefresh } from "antd-mobile";
import { FC } from "react";

type CatalogProductListProps = {
  userId: string;
};

const CatalogProductList: FC<CatalogProductListProps> = ({ userId }) => {
  const searchListParams = useAppSelector((x) => x.product.searchListParams);

  const { data: cartProductIds, isLoading } = useQuery({
    queryKey: [QueryKey.UserCartProductIds, userId],
    queryFn: () => getUserCartProductIds(userId),
  });

  return (
    <QueryPaginationContainer<Product[], CatalogProductModel[]>
      queryOptions={{
        queryKey: [
          QueryKey.CatalogProductsPage,
          objectToQueryString(searchListParams, {
            arrayValueWillBeJoined: true,
          }),
        ],
        getNextPageParam: (lastPage) => {
          const info = lastPage as PaginationDto;
          return info.page + 1;
        },
        initialPageParam: 1,
        queryFn: ({ pageParam }) =>
          getProductListBack({
            page: pageParam as number,
            pageSize: 10,
            ...searchListParams,
          }),
        mapper: (x) => x.map(mapCatalogProductInfo),
      }}
    >
      {({ data, fetchNextPage, refetch }) => {
        return (
          <PullToRefresh onRefresh={refetch} {...typography.pullToRefresh}>
            <div className="flex flex-wrap justify-start items-start gap-4">
              {data.data.map((x) => (
                <CatalogProductCard
                  loading={isLoading}
                  product={x}
                  key={x.id}
                  addedToCart={cartProductIds?.includes(x.id)}
                  userId={userId}
                />
              ))}
            </div>
            <InfiniteScroll
              loadMore={async () => {
                await fetchNextPage();
              }}
              threshold={0}
              hasMore={data.page < data.lastPage}
            >
              {(hasMore) =>
                hasMore ? <>Загружаем...</> : <>Все товары загружены</>
              }
            </InfiniteScroll>
          </PullToRefresh>
        );
      }}
    </QueryPaginationContainer>
  );
};

export default CatalogProductList;
