import { clientApi } from "@shared/utils";
import { Product, ProductDto, ProductDtoBase } from "../model";

export const createProduct = async ({
  dto,
  images,
}: {
  dto: ProductDtoBase;
  images: FormData;
}) => {
  try {
    const createProductResult = await clientApi
      .post<Product, ProductDtoBase>("/product", dto)
      .then((x) => x.data);

    const imgs = images.get("uuids");
    if (imgs) {
      return uploadPropductImages(createProductResult.id, images);
    }

    return createProductResult;
  } catch (e) {
    return e as Promise<Product>;
  }
};

export const updateProduct = async ({
  dto,
  images,
}: {
  dto: ProductDto;
  images: FormData;
}): Promise<Product> => {
  try {
    const updateProductResult = await clientApi
      .put<Product, ProductDto>("/product", dto)
      .then((x) => x.data);

    const imgs = images.get("uuids");
    if (imgs) {
      return uploadPropductImages(updateProductResult.id, images);
    }

    return updateProductResult;
  } catch (e) {
    return e as Promise<Product>;
  }
};

const uploadPropductImages = async (productId: string, formData: FormData) => {
  return clientApi
    .post<Product, FormData>(
      `/product/uploadImages?productId=${productId}`,
      formData,
    )
    .then((x) => x.data);
};
