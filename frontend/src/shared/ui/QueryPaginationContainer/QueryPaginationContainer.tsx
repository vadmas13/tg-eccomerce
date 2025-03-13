"use client";

import {
  DefaultError,
  InfiniteData,
  QueryObserverResult,
  RefetchOptions,
  UndefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { ReactNode } from "react";
import ErrorComponent from "../ErrorComponent";
import Loader from "../Loader";
import { PaginationDto } from "@shared/models";

type QueryContainerProps<TData, TMappedData = TData> = {
  queryOptions: QueryOptions<PaginationDto<TData>> & {
    mapper?: (data: TData) => TMappedData;
  };
  children:
    | ((options: {
        data: PaginationDto<TMappedData>;
        loading: boolean;
        fetchNextPage: () => Promise<unknown>;
        refetch: (
          options?: RefetchOptions,
        ) => Promise<
          QueryObserverResult<
            InfiniteData<PaginationDto<TData>, unknown>,
            Error
          >
        >;
      }) => ReactNode)
    | ReactNode;
};

type QueryOptions<TData> = UndefinedInitialDataInfiniteOptions<
  TData,
  DefaultError,
  TData
>;

const QueryPaginationContainer = <TData, TMappedData = TData>({
  children,
  queryOptions,
}: QueryContainerProps<TData, TMappedData>) => {
  const { data, isLoading, error, fetchNextPage, refetch } = useInfiniteQuery<
    PaginationDto<TData>
  >({
    ...queryOptions,
    queryKey: queryOptions.queryKey.filter((x) => !!x),
  } as any);

  if (isLoading) {
    return (
      <div className="m-5">
        <Loader />
      </div>
    );
  }

  const d = data?.pages[data.pages?.length - 1];

  const dto = (queryOptions.mapper
    ? { ...d, data: queryOptions.mapper(d.data) }
    : d) as unknown as PaginationDto<TMappedData>;

  return (
    <>
      {error || !data ? (
        <ErrorComponent error={error} />
      ) : typeof children === "function" ? (
        children({
          data: dto,
          loading: isLoading,
          fetchNextPage,
          refetch,
        })
      ) : (
        children
      )}
    </>
  );
};

export default QueryPaginationContainer;
