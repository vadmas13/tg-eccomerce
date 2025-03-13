import { FormInstance } from "antd-mobile/es/components/form/form";
import { UpsertDocumentModel } from "../../document";
import { ProductDtoBase, ProductFormModel } from "../model";

export const mapProductToCreateDto = (
  data: ProductFormModel,
): ProductDtoBase => ({
  ...data,
  price: parseFloat(data.price.toString()),
  discountedPrice: parseFloat(data.discountedPrice.toString()),
});

export const mapProductUploadedImages = (
  images: UpsertDocumentModel[],
): FormData => {
  const formData = new FormData();

  images.forEach((x) => {
    if (x.extra && x.key) {
      formData.append("files", x.extra);
      formData.append("uuids", x.key);
    }
  });

  return formData;
};

export const mapProductFormDataToDto = (
  form: FormInstance,
  removeImageIds: string[],
  avatarCustomId?: string,
): { dto: ProductDtoBase; imagesDto: FormData } => {
  const categoryIds = form.getFieldValue("categoryIds");
  const values = form.getFieldsValue();
  const images: UpsertDocumentModel[] = form.getFieldValue("images");
  const imagesDto = mapProductUploadedImages(images);
  const dto = mapProductToCreateDto({
    ...values,
    categoryIds,
    removeImageIds,
    avatarCustomId,
  });
  return { dto, imagesDto };
};
