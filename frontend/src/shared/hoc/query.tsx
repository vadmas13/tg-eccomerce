import { ErrorComponent, Loader } from "@shared/ui";
import {
  DefaultError,
  UndefinedInitialDataOptions,
  useQuery,
} from "@tanstack/react-query";

type QueryOptions<TData> = UndefinedInitialDataOptions<
  TData,
  DefaultError,
  TData
>;

export const query =
  <P extends Record<string, unknown>, TData, TMappedData = TData>(
    ChildComponent: React.ComponentType<P & { data: TMappedData }>,
    queryOptions: QueryOptions<TData> & {
      mapper?: (data: TData) => TMappedData;
    },
  ): React.FC<P> =>
  ({ ...props }) => {
    const { data, isLoading, error } = useQuery(queryOptions);

    if (isLoading) {
      return <Loader />;
    }

    return (
      <>
        {error || !data ? (
          <ErrorComponent error={error} />
        ) : (
          <ChildComponent
            {...(props as P)}
            data={
              queryOptions.mapper
                ? queryOptions.mapper(data)
                : (data as TMappedData)
            }
          />
        )}
      </>
    );
  };
