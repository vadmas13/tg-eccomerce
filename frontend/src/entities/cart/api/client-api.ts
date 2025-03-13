import { clientApi } from "@shared/utils";
import { CartDto, CartItemAddModel, CartItemRemoveModel } from "../models";

export const addToCartItem = async (data: CartItemAddModel) =>
  clientApi.post<CartDto, CartItemAddModel>("/cart/add", data);

export const removeFromCartItem = async (data: CartItemRemoveModel) =>
  clientApi.post<unknown, CartItemRemoveModel>("/cart/remove", data);

export const getUserCart = async (userId: string) => {
  return clientApi.get<CartDto>(`/cart?userId=${userId}`)?.then((x) => x.data);
};

export const getUserCartProductIds = async (userId: string) => {
  return clientApi
    .get<string[]>(`/cart/productIds?userId=${userId}`)
    ?.then((x) => x.data);
};

export const getCartCount = async (userId: string) => {
  return clientApi
    .get<number>(`/cart/count?userId=${userId}`)
    ?.then((x) => x.data);
};
