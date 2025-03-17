import { Action } from "antd-mobile/es/components/action-sheet";
import { DataOption } from "../models";

export const getStateDataOptions = <T extends string>(
  lableMapper: Record<T, string>,
) => {
  return Object.keys(lableMapper).reduce((res, curr) => {
    const key = curr as T;
    res.push({ name: lableMapper[key], value: key });
    return res;
  }, [] as DataOption[]);
};

export const getStateActionDataOptions = <T extends string>(
  lableMapper: Record<T, string>,
  callback: (state: T) => void,
) => {
  return Object.keys(lableMapper).reduce((res, curr) => {
    const key = curr as T;
    res.push({
      text: lableMapper[key],
      key: key,
      onClick: () => callback(key),
    });
    return res;
  }, [] as Action[]);
};
