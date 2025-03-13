"use server";

import { accessTokenCookieKey } from "../../consts";
import { cookies } from "next/headers";
import { handleErrorMsg } from "./error-handler";

export const backQuery = async <TData, TDto = Record<string, unknown>>(
  url: string,
  method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH",
  dto?: TDto,
) => {
  const cookieStore = cookies();
  const token = cookieStore.get(accessTokenCookieKey);
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: token!.value,
    },
    body: dto ? JSON.stringify(dto) : undefined,
  }).then(async (res) => {
    const data = await res.json();
    if (!res.ok) {
      throw new Error(handleErrorMsg(data));
    }
    return data as TData;
  });
};
