export interface CartItemAddModel {
  userId?: string;
  productId: string;
  quantity?: number;
}

export interface CartItemRemoveModel extends CartItemAddModel {
  removeAll?: boolean;
}
