import { NextRequest, NextResponse } from "next/server";
import { parseAuthToken } from "../token";
import {
  accessTokenCookieKey,
  NextHeaders,
  refreshTokenCookieKey,
  Roles,
} from "../../consts";
import { refreshToken, updateToken } from "./auth-token";
import { ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { getHasAuthTgQueryParams } from "../tg-query-params";
import { JWTPayload, JWTVerifyResult } from "jose";

const setAppHeaders = (
  userData: JWTVerifyResult<JWTPayload> | null,
  res: NextResponse,
): NextResponse => {
  const isAdmin =
    userData?.payload.roles &&
    Array.isArray(userData.payload.roles) &&
    userData.payload.roles.includes(Roles.Admin);
  res.headers.set(NextHeaders.XIsAdmin, isAdmin ? "true" : "false");
  res.headers.set(NextHeaders.XUserId, userData?.payload.id as string);
  res.headers.set(NextHeaders.XUserName, userData?.payload.username as string);

  return res;
};

const getAuthToken = async (
  searchParams: URLSearchParams,
  response: NextResponse,
) => {
  const result = await updateToken(searchParams, response);
  if (result) {
    const { accessToken, res } = result;
    const userData = await parseAuthToken(accessToken);
    return setAppHeaders(userData, res);
  }
};

export async function setAdminHeader(
  request: NextRequest,
  response: NextResponse,
  token?: string,
): Promise<NextResponse> {
  const { searchParams } = request.nextUrl;
  const hasTgAuthParams = getHasAuthTgQueryParams(searchParams);

  if (hasTgAuthParams) {
    request.cookies.delete(accessTokenCookieKey);
    request.cookies.delete(refreshTokenCookieKey);
  }

  if (!token || hasTgAuthParams) {
    const refresh = request.cookies.get(refreshTokenCookieKey);
    if (refresh?.value) {
      const data = await refreshToken(refresh.value);
      if (!data.accessToken) {
        const res = await getAuthToken(searchParams, response);
        return res ? res : response;
      }

      response.cookies.set(accessTokenCookieKey, data.accessToken, {
        maxAge: 60 * 60,
      });
      response.cookies.set(refreshTokenCookieKey, data.refreshToken, {
        httpOnly: true,
        maxAge: 60 * 60 * 24,
      });

      return response;
    }
    const res = await getAuthToken(searchParams, response);

    return res ? res : response;
  }

  const userData = await parseAuthToken(token);
  if (userData?.payload.id && userData?.payload.roles) {
    return setAppHeaders(userData, response);
  }

  return response;
}

export const checkAdmin = (headersList: ReadonlyHeaders) => {
  const value = headersList.get(NextHeaders.XIsAdmin);
  return value === "true";
};
