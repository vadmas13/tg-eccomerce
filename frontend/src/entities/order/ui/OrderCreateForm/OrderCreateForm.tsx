"use client";

import { mapOrderFormData } from "../../mappers";
import { OrderCreateFormModel } from "../../models";
import { Button, Dialog, Form, Input, TextArea } from "antd-mobile";
import { FC } from "react";
import { typography } from "@shared/consts";
import OrderAddressForm from "../OrderAddressForm";
import { useAppDispatch } from "@shared/hooks";
import { addNotification, errorNotification } from "@features";
import { UserDto } from "@entities/user";

type OrderCreateFormProps = {
  data?: UserDto;
  onFinish: (dto: OrderCreateFormModel) => void;
  isPending: boolean;
};

const OrderCreateForm: FC<OrderCreateFormProps> = ({
  onFinish,
  data,
  isPending,
}) => {
  const dispatch = useAppDispatch();

  const [form] = Form.useForm<OrderCreateFormModel>();

  console.log("data - userInfo", data);
  return (
    <div className="rounded-lg shadow-lg p-4">
      <Form
        initialValues={{ ...data }}
        onFinish={async () => {
          const dto = mapOrderFormData(form);
          await Dialog.confirm({
            content: "Хотите сохранить личные данные для последущих заказов?",
            onConfirm: () => onFinish({ ...dto, saveUserData: true }),
            onCancel: () => onFinish(dto),
            confirmText: "Да",
            cancelText: "Нет",
          });
        }}
        onFinishFailed={() => {
          dispatch(
            addNotification(
              errorNotification("Необходимо заполнить обязательные поля"),
            ),
          );
        }}
        form={form}
        footer={
          <Button
            block
            type="submit"
            color="primary"
            size="mini"
            loading={isPending}
          >
            Оформить заказ
          </Button>
        }
      >
        <Form.Item
          name="firstName"
          label="Имя получателя"
          rules={[{ required: true, message: typography.form.required }]}
        >
          <Input placeholder={typography.form.placeholder.input} />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Фамилия получателя"
          rules={[{ required: true, message: typography.form.required }]}
        >
          <Input placeholder={typography.form.placeholder.input} />
        </Form.Item>
        <Form.Item name="secondName" label="Отчество получателя">
          <Input placeholder={typography.form.placeholder.input} />
        </Form.Item>

        <Form.Item
          name="address"
          label="Адрес доставки"
          rules={[
            { required: true, message: "Пожалуйста, введите адрес доставки" },
          ]}
          shouldUpdate
        >
          <OrderAddressForm setFieldValue={form.setFieldValue} />
        </Form.Item>
        <Form.Item name="comment" label="Комментарий">
          <TextArea placeholder={typography.form.placeholder.input} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default OrderCreateForm;
