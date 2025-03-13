"use client";

import { typography } from "@shared/consts";
import { Category } from "../../models";
import { Button, Form, Input } from "antd-mobile";
import { FC } from "react";

type CategoryFormProps = {
  onFinish: (data: { name: string }) => void;
  data?: Category;
  isPending?: boolean;
  isCreate?: boolean;
};

const CategoryForm: FC<CategoryFormProps> = ({
  onFinish,
  data,
  isPending,
  isCreate,
}) => {
  return (
    <Form
      onFinish={(data) => onFinish(data)}
      initialValues={{ ...data }}
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
    </Form>
  );
};

export default CategoryForm;
