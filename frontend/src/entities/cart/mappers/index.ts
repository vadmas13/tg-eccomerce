import { mapProductInfo } from "../../product";
import { CartDto, CartModel } from "../models";

export const mapCartDto = (dto: CartDto): CartModel => {
  const items = dto.items.map((x) => ({
    ...x,
    product: mapProductInfo(x.product),
  }));

  return {
    ...dto,
    items,
  };
};
