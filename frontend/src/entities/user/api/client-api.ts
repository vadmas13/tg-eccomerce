import { clientApi } from "@shared/utils";
import { UserDto } from "../models";

export const getUser = (userId: string) => {
  return clientApi.get<UserDto>(`/user?userId=${userId}`).then((x) => x.data);
};
