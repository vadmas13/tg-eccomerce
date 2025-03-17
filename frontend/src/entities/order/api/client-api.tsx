import { PaginationDto } from "@shared/models";
import {
  clientApi,
  mapPaginationDtoData,
  objectToQueryString,
} from "@shared/utils";
import {
  OrderCreateModel,
  OrderDto,
  OrderModel,
  OrderQueryParams,
  OrderUpdatePaymentState,
  OrderUpdateState,
} from "../models";
import { OrderPaymentState, OrderStatus } from "../consts";
import { mapOrderInfo } from "../mappers";

export const getAllOrders = (params?: OrderQueryParams) => {
  return clientApi
    .get<PaginationDto<OrderDto[]>>(
      `/order/all?${objectToQueryString(params, {
        arrayValueWillBeJoined: true,
      })}`,
    )
    ?.then((x) => mapPaginationDtoData(x.data, mapOrderInfo));
};

export const getUserOrders = (userId: string, params?: OrderQueryParams) => {
  return clientApi
    .get<PaginationDto<OrderDto[]>>(
      `/order/list?userId=${userId}&${objectToQueryString(params, {
        arrayValueWillBeJoined: true,
      })}`,
      { params },
    )
    ?.then((x) => mapPaginationDtoData(x.data, mapOrderInfo));
};

export const getOrder = (orderId: string) => {
  return clientApi
    .get<OrderDto>(`/order?orderId=${orderId}`)
    ?.then((x) => mapOrderInfo(x.data));
};

export const updateOrderState = (id: string, status: OrderStatus) => {
  return clientApi
    .patch<OrderDto, OrderUpdateState>("/order", { id, status })
    ?.then((x) => x.data);
};

export const updateOrderPaymentState = (
  id: string,
  status: OrderPaymentState,
) => {
  return clientApi
    .patch<OrderDto, OrderUpdatePaymentState>("/order", { id, status })
    ?.then((x) => x.data);
};

export const createOrder = (dto: OrderCreateModel) => {
  return clientApi
    .post<OrderDto, OrderCreateModel>("/order", dto)
    ?.then((x) => x.data);
};

export const deleteOrder = (orderId: string) => {
  return clientApi
    .delete<OrderModel>(`/order?orderId=${orderId}`)
    ?.then((x) => x.data);
};
