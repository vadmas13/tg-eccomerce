"use client";

import { CheckedListActions, EntityList, EntityListActions } from "@features";
import { typography } from "@shared/consts";
import { useListMutation } from "@shared/hooks";
import { PaginationDto, PaginationModel } from "@shared/models";
import { DebounceSearchBar, QueryPaginationContainer } from "@shared/ui";
import { MutationFunction } from "@tanstack/react-query";
import { InfiniteScroll, PullToRefresh } from "antd-mobile";
import { useState } from "react";

type QueryEntityListProps<TData> = {
  title: string;
  deleteMutation: {
    fn: MutationFunction<TData, string>;
    queryKeys: string[][];
  };
  queryOptions: {
    getQueryKeys: (name?: string) => string[];
    queryFn: (params?: PaginationModel) => Promise<PaginationDto<TData[]>>;
    mapper: (data: TData) => { title: string; id: string };
  };
  actions?: {
    createUrl?: string;
    editBaseUrl?: string;
  };
};

const QueryEntityList = <TData extends { id: string }>({
  title,
  deleteMutation,
  queryOptions,
  actions,
}: QueryEntityListProps<TData>) => {
  const [name, setName] = useState<string>();
  const [isCheckable, setIsCheckable] = useState(false);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const { mutate: deleteItem } = useListMutation<
    TData,
    PaginationDto<TData[]>,
    string
  >(deleteMutation.queryKeys, deleteMutation.fn, ({ id }) => (oldData) => {
    return {
      ...oldData,
      data: oldData?.data?.filter((category) => category.id !== id),
    };
  });

  const toggleIsCheckable = () => {
    if (isCheckable) {
      setCheckedIds([]);
    }
    setIsCheckable((prev) => !prev);
  };

  const handleCheckItem = (id: string) => {
    if (!isCheckable) {
      return;
    }
    if (checkedIds.includes(id)) {
      setCheckedIds((prev) => [...prev.filter((x) => x !== id)]);
    } else {
      setCheckedIds((prev) => [...prev, id]);
    }
  };

  const handleDeleteItem = (id: string) => {
    deleteItem(id);
  };

  return (
    <div>
      <div className="flex justify-between align-middle mb-2">
        <h1 className="font-bold text-lg">{title}</h1>
        <EntityListActions
          createEntityUrl={actions?.createUrl}
          toggleIsCheckable={toggleIsCheckable}
          isCheckable={isCheckable}
        />
      </div>
      <DebounceSearchBar onChange={setName} />
      <QueryPaginationContainer<TData[]>
        queryOptions={{
          queryKey: queryOptions.getQueryKeys(name),
          getNextPageParam: (lastPage) => {
            const info = lastPage as PaginationDto;
            return info.page + 1;
          },
          initialPageParam: 1,
          queryFn: ({ pageParam }) =>
            queryOptions.queryFn({
              name,
              page: pageParam as number,
              pageSize: 10,
            }),
        }}
      >
        {({ data, fetchNextPage, refetch }) => {
          return (
            <PullToRefresh onRefresh={refetch} {...typography.pullToRefresh}>
              <EntityList
                collection={data.data?.map(queryOptions.mapper) ?? []}
                onDelete={handleDeleteItem}
                editBaseUrl={actions?.editBaseUrl}
                checkedIds={checkedIds}
                handleCheckItem={handleCheckItem}
                isCheckable={isCheckable}
              />
              <InfiniteScroll
                loadMore={async () => {
                  await fetchNextPage();
                }}
                threshold={0}
                hasMore={data.page < data.lastPage}
              >
                {(hasMore) =>
                  hasMore ? <>Загружаем...</> : <>Полностью загружено</>
                }
              </InfiniteScroll>
            </PullToRefresh>
          );
        }}
      </QueryPaginationContainer>
      {isCheckable && (
        <CheckedListActions
          checkedIds={checkedIds}
          deleteItem={handleDeleteItem}
          onSuccess={() => setIsCheckable(false)}
        />
      )}
    </div>
  );
};

export default QueryEntityList;
