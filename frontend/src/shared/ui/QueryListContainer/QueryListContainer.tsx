"use client";

import {
  DefaultError,
  QueryObserverResult,
  RefetchOptions,
  UndefinedInitialDataOptions,
  useQuery,
} from "@tanstack/react-query";
import { ReactNode } from "react";
import ErrorComponent from "../ErrorComponent";
import Loader from "../Loader";

type QueryContainerProps<TData, TMappedData> = {
  queryOptions: QueryOptions<TData> & {
    mapper?: (data: TData) => TMappedData;
  };
  children:
    | ((options: {
        data: TData;
        loading: boolean;
        refetch: (
          options?: RefetchOptions,
        ) => Promise<QueryObserverResult<TData, Error>>;
      }) => ReactNode)
    | ReactNode;
};

type QueryOptions<TData> = UndefinedInitialDataOptions<
  TData,
  DefaultError,
  TData
>;

const QueryListContainer = <TData, TMappedData = TData>({
  children,
  queryOptions,
}: QueryContainerProps<TData, TMappedData>) => {
  const { data, isLoading, error, refetch } = useQuery<TData>(
    queryOptions as any,
  );

  if (isLoading) {
    return (
      <div className="m-5">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {error || !data ? (
        <ErrorComponent error={error} />
      ) : typeof children === "function" ? (
        children({
          data,
          loading: isLoading,
          refetch,
        })
      ) : (
        children
      )}
    </>
  );
};

export default QueryListContainer;
