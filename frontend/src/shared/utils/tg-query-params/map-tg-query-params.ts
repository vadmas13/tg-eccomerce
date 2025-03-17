import { TgBotQueryParams, TgUser } from "./tg-query-params.types";

export const mapTgQueryParams = (dto: TgBotQueryParams): TgUser => {
  return {
    firstName: dto.first_name,
    lastName: dto.last_name,
    photoUrl: dto.photo_url,
    username: dto.username,
    tgUserId: dto.id,
    //hash: dto.hash,
  };
};

export const objectToQueryString = (
  params?: Record<string, any>,
  options?: { arrayValueWillBeJoined?: boolean },
): string => {
  if (!params) return "";
  const buildQuery = (obj: Record<string, any>, prefix = ""): string => {
    return Object.entries(obj)
      .filter(([_, value]) => !!value)
      .flatMap(([key, value]) => {
        const encodedKey = encodeURIComponent(
          prefix ? `${prefix}[${key}]` : key,
        );
        if (value instanceof Object && !Array.isArray(value)) {
          return buildQuery(value, encodedKey);
        }
        if (Array.isArray(value)) {
          if (options?.arrayValueWillBeJoined) {
            return `${encodedKey}=${value.join(",")}`;
          }
          return value.map((val) => `${encodedKey}=${encodeURIComponent(val)}`);
        }
        return `${encodedKey}=${encodeURIComponent(value)}`;
      })
      .join("&");
  };

  const queryString = buildQuery(params);
  return queryString ? `?${queryString}` : "";
};
