import { NextResponse } from "next/server";
import { getAuthTgQueryParams, TgUser } from "../tg-query-params";
import { accessTokenCookieKey, refreshTokenCookieKey } from "@shared/consts";

export const auth = async (params: TgUser) => {
  if (!params.tgUserId || !params.username) {
    return;
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(params),
  });

  if (!res.ok) {
    const errorData = await res.json();
    console.log("errorData", "export const auth");
    throw new Error(
      errorData.message[0].message ||
        errorData.message ||
        "Что-то пошло не так",
    );
  }

  return res.json();
};

export const refreshToken = async (refreshToken: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-tokens`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    },
  );

  if (!res.ok) {
    const errorData = await res.json();
    console.log("errorData", "export const refreshToken");
    return errorData;
  }

  return res.json();
};

export async function updateToken(
  searchParams: URLSearchParams,
  response: NextResponse,
) {
  const params = getAuthTgQueryParams(searchParams);
  const authData = await auth(params);
  if (authData && authData.accessToken) {
    response.cookies.set(accessTokenCookieKey, authData.accessToken, {
      maxAge: 60 * 60, // Время жизни куки в секундах (1 час)
    });
    response.cookies.set(refreshTokenCookieKey, authData.refreshToken, {
      // path: "/", // Путь, где кука доступна
      httpOnly: true, // Доступна только через HTTP(S), не доступна через JavaScript
      // secure: process.env.NODE_ENV === "production", // Использовать secure флаг в продакшене
      maxAge: 60 * 60 * 24, // Время жизни куки в секундах (1 день)
    });

    return {
      res: response,
      accessToken: authData.accessToken,
      refreshToken: authData.refreshToken,
    };
  }
}
