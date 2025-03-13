import { Product } from "../../product";
import { DocumentType } from "@shared/consts";

export interface Document {
  id: string;
  customId: string;
  name?: string;
  documentType: DocumentType;
  value: Buffer;
  updatedAt: string;
  createdAt: string;
  productId: string;
  product: Product;
}
