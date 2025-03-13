export enum OrderAddressType {
  SDEK = "SDEK",
  RU_POST = "RU_POST",
}

export const orderAddressTypeOptions = [
  {
    label: "СДЭК",
    value: OrderAddressType.SDEK,
  },
  {
    label: "Почта России",
    value: OrderAddressType.RU_POST,
  },
];
