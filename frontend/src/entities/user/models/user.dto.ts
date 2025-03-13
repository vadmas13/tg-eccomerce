import { Roles } from "@shared/consts";

export interface UserDto {
  id: string;
  tgUserId: string;
  username: string;
  firstName: string;
  lastName: string;
  secondName: string;
  photoUrl: string;
  roles: Roles;
  isBlocked: boolean;
  blockedReason: string;
  createdAt: string;
  updatedAt: string;
}
