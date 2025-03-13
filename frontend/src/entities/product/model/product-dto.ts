export interface ProductDtoBase {
  name: string;
  description?: string;
  price: number;
  discountedPrice?: number;
  categoryIds?: string[];
  removeImageIds?: string[];
  avatarCustomId?: string;
  attributes?: string;
}

export interface ProductDto extends ProductDtoBase {
  id: string;
}
