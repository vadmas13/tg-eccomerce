import { AxiosError } from "axios";
import { ApiPropertyError } from "../models";
import {
  QueryClient,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "@tanstack/react-query";

export const useAppMutation = <TData, TVariables = void, TContext = unknown>(
  options: UseMutationOptions<
    TData,
    AxiosError<ApiPropertyError>,
    TVariables,
    TContext
  >,
  queryClient?: QueryClient,
) => useMutation(options, queryClient);

export const useAppQuery = <TData>(
  options: UseQueryOptions<TData, AxiosError<ApiPropertyError>>,
  queryClient?: QueryClient,
) => useQuery(options, queryClient);
