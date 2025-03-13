import { useAppDispatch, useAppMutation } from "@shared/hooks";
import { ApiPropertyError } from "@shared/models";
import { QueryClient, UseMutationOptions } from "@tanstack/react-query";
import { addNotification } from "../slices";
import { errorNotification, successNotification } from "../utils";
import { AxiosError } from "axios";

export const useNotificationMutation = <
  TData,
  TVariables = void,
  TContext = unknown,
>(
  options: UseMutationOptions<
    TData,
    AxiosError<ApiPropertyError>,
    TVariables,
    TContext
  > & { successMessage?: string },
  queryClient?: QueryClient,
) => {
  const dispatch = useAppDispatch();

  return useAppMutation(
    {
      ...options,
      onError: (e, v, c) => {
        console.log("error -resp", e);
        options?.onError?.(e, v, c);

        if (e.response) {
          const { message, property, fieldName } = e.response.data.message[0];
          const msg = `${fieldName ?? property} - ${message}`;
          dispatch(addNotification(errorNotification(msg)));
        }
      },
      onSuccess: (d, v, c) => {
        if (options?.successMessage) {
          dispatch(
            addNotification(successNotification(options.successMessage)),
          );
        }
        options?.onSuccess?.(d, v, c);
      },
    },
    queryClient,
  );
};
