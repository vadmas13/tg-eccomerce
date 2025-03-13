import { Category } from "@entities/categories";
import { UpsertDocumentModel } from "@entities/document";

export interface ProductFormModel {
  id?: string;
  name: string;
  description?: string;
  price: number;
  discountedPrice: number;
  categoryIds?: string[];
  removeImageIds?: string[];
  avatarCustomId?: string;
  attributes?: string;
  images?: UpsertDocumentModel[];
  categories: Category[];
  addedToCartCount?: number;
  quantity?: number;
}
