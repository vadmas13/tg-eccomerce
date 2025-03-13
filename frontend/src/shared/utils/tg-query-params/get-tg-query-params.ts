import { mapTgQueryParams } from "./map-tg-query-params";
import { TgBotQueryParams, TgUser } from "./tg-query-params.types";

export const getAuthTgQueryParams = (
  searchParams: URLSearchParams,
  keys: (keyof TgBotQueryParams)[] = [
    "first_name",
    "id",
    "last_name",
    "last_name",
    "photo_url",
    "username",
  ],
): TgUser => {
  const params = keys.reduce((res, curr) => {
    const value = searchParams.get(curr);
    res[curr] = value as string;
    return res;
  }, {} as TgBotQueryParams);
  return mapTgQueryParams(params);
};

export const getHasAuthTgQueryParams = (searchParams: URLSearchParams) => {
  const params = getAuthTgQueryParams(searchParams) as unknown as Record<
    string,
    string
  >;
  return !!Object.keys(params).filter((key) => !!params[key]).length;
};
