import { PaginationDto, PaginationModel } from "@shared/models";
import { clientApi, mapPaginationDtoData } from "@shared/utils";
import {
  OrderCreateModel,
  OrderDto,
  OrderModel,
  OrderUpdateState,
} from "../models";
import { OrderStatus } from "../consts";
import { mapOrderInfo } from "../mappers";

export const getAllOrders = (params?: PaginationModel) => {
  return clientApi
    .get<PaginationDto<OrderDto[]>>("/order/all", { params })
    ?.then((x) => mapPaginationDtoData(x.data, mapOrderInfo));
};

export const getUserOrders = (userId: string, params?: PaginationModel) => {
  return clientApi
    .get<PaginationDto<OrderDto[]>>(`/order/list?userId=${userId}`, { params })
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
