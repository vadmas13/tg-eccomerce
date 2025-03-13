import {
  NotificationColor,
  useNotification,
} from "@providers/NotificationProvider";
import {
  DefaultError,
  MutationFunction,
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

export const useListMutation = <TData, TDataCash, TVariables>(
  queryKeys: string[][],
  mutationFn: MutationFunction<TData, TVariables>,
  setCache: (
    mutatedData: TData,
  ) => (oldData: TDataCash) => TDataCash[] | TDataCash,
  onSuccess?: (
    mutatedData: TData,
    options: {
      queryClient: QueryClient;
      showNotification: (
        message: string,
        color?: NotificationColor,
        duration?: number,
      ) => void;
    },
  ) => void,
) => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();

  return useMutation<TData, DefaultError, TVariables>({
    mutationFn: mutationFn,
    onSuccess: async (mutatedData: TData) => {
      for (const key of queryKeys) {
        await queryClient.setQueryData(key, setCache(mutatedData));
        await queryClient.invalidateQueries({ queryKey: key });
      }
      onSuccess?.(mutatedData, { queryClient, showNotification });
    },
    onError: (error) => {
      showNotification(error.message ?? "Непредвиденная ошибка", "error");
    },
  });
};
