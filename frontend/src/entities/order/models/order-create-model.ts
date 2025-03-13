import { OrderAddressType } from "../consts";

export interface OrderCreateFormModel {
  address: string;
  addressType: OrderAddressType;
  firstName: string;
  secondName: string;
  lastName: string;
  comment?: string;
  saveUserData?: boolean;
}

export interface OrderCreateModel extends OrderCreateFormModel {
  userId: string;
}
