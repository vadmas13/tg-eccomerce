"use client";

import { Button, Form, Input, TextArea } from "antd-mobile";
import { ProductDtoBase, ProductFormModel } from "../../model";
import { FC, useState } from "react";
import { typography } from "@shared/consts";
import { CategoriesCheckList, mapProductFormDataToDto } from "@entities";
import { ImageGroupUploader } from "@shared/ui";

type ProductFormProps = {
  onFinish: (data: ProductDtoBase, images: FormData) => void;
  data?: ProductFormModel;
  isPending?: boolean;
  isCreate?: boolean;
};

const ProductForm: FC<ProductFormProps> = ({
  onFinish,
  data,
  isPending,
  isCreate,
}) => {
  const [form] = Form.useForm<ProductFormModel>();
  const [avatarCustomId, setAvatarCustomId] = useState<string | undefined>(
    data?.avatarCustomId,
  );
  const [removeImageIds, setRemoveImageIds] = useState<string[]>([]);

  return (
    <Form
      onFinish={() => {
        const { dto, imagesDto } = mapProductFormDataToDto(
          form,
          removeImageIds,
          avatarCustomId,
        );
        onFinish(dto, imagesDto);
      }}
      initialValues={{ ...data }}
      form={form}
      footer={
        <Button
          block
          type="submit"
          color="primary"
          size="mini"
          loading={isPending}
        >
          {isCreate ? "Создать" : "Обновить"}
        </Button>
      }
    >
      <Form.Item
        name="name"
        label="Наименование"
        rules={[{ required: true, message: typography.form.required }]}
      >
        <Input placeholder={typography.form.placeholder.input} />
      </Form.Item>
      <Form.Item name="description" label="Описание">
        <TextArea placeholder={typography.form.placeholder.input} />
      </Form.Item>
      <Form.Item name="attributes" label="Характеристики">
        <TextArea placeholder={typography.form.placeholder.input} />
      </Form.Item>
      <Form.Item name="price" label="Стоимость">
        <Input type="number" placeholder={typography.form.placeholder.input} />
      </Form.Item>
      <Form.Item name="discountedPrice" label="Стоимость c учетом скидки">
        <Input type="number" placeholder={typography.form.placeholder.input} />
      </Form.Item>
      <Form.Item shouldUpdate label="Категории товара">
        {({ getFieldValue, setFieldValue }) => (
          <CategoriesCheckList
            getFieldValue={getFieldValue}
            setFieldValue={setFieldValue}
            openWhenHasValues
          />
        )}
      </Form.Item>
      <Form.Item shouldUpdate label="Изображения">
        {({ getFieldValue, setFieldValue }) => (
          <ImageGroupUploader
            onChange={(x) => setFieldValue("images", x)}
            imageList={getFieldValue("images")}
            mainImageId={avatarCustomId}
            setMainImage={setAvatarCustomId}
            onDelete={(key) => setRemoveImageIds((prev) => [...prev, key])}
          />
        )}
      </Form.Item>
    </Form>
  );
};

export default ProductForm;
