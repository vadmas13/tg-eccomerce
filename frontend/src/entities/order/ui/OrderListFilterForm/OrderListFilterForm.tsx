"use client";

import { mapOrderStateToLabel, mapPaymentStateToLabel } from "@entities";
import {
  EntityListPopupContext,
  EntityListPopupContextModel,
} from "@shared/context";
import { DatePickerCustom, FilterCheckList } from "@shared/ui";
import { getStateDataOptions } from "@shared/utils";
import { Button, Form } from "antd-mobile";
import { FC, useContext } from "react";

type OrderListFilterFormProps = {
  setFilters: (data: Record<string, unknown>) => void;
  initialData: Record<string, unknown>;
};

const OrderListFilterForm: FC<OrderListFilterFormProps> = ({
  setFilters,
  initialData,
}) => {
  const [form] = Form.useForm();
  const context = useContext<EntityListPopupContextModel>(
    EntityListPopupContext,
  );

  const handleClose = () => {
    form.resetFields();
    form?.setFieldValue("createdAtStart", undefined);
    form?.setFieldValue("createdAtEnd", undefined);
    setFilters({ name: initialData.name });
    context?.setVisibleSearchBar(false);
  };

  const handleFinish = () => {
    const createdAtStart = form?.getFieldValue("createdAtStart");
    const createdAtEnd = form?.getFieldValue("createdAtEnd");
    const statusPayment = form?.getFieldValue("statusPayment");
    const status = form?.getFieldValue("status");
    setFilters({ createdAtStart, createdAtEnd, statusPayment, status });
    context?.setVisibleSearchBar(false);
  };

  return (
    <Form
      layout="vertical"
      form={form}
      footer={
        <div className="flex items-center gap-4">
          <Button block type="submit" color="primary" size="middle">
            Применить
          </Button>
          <Button block color="default" size="middle" onClick={handleClose}>
            Отменить
          </Button>
        </div>
      }
      onFinish={handleFinish}
      initialValues={initialData}
    >
      <div className="mt-4">
        <h2 className="font-bold text-lg mb-4 pl-4">Фильтры списка заказов</h2>
        <div>
          <p className="pl-4">Дата создания заказа</p>
          <div className="flex gap-4">
            <Form.Item label="с" shouldUpdate>
              {({ getFieldValue, setFieldValue }) => (
                <DatePickerCustom
                  setValue={(v) => setFieldValue("createdAtStart", v)}
                  value={getFieldValue("createdAtStart")}
                />
              )}
            </Form.Item>
            <Form.Item label="по" shouldUpdate>
              {({ getFieldValue, setFieldValue }) => (
                <DatePickerCustom
                  setValue={(v) => setFieldValue("createdAtEnd", v)}
                  value={getFieldValue("createdAtEnd")}
                />
              )}
            </Form.Item>
          </div>
        </div>
        <Form.Item label="Состояние заказа" shouldUpdate>
          {({ getFieldValue, setFieldValue }) => (
            <FilterCheckList
              options={getStateDataOptions(mapOrderStateToLabel)}
              setValues={(v) => setFieldValue("status", v)}
              values={getFieldValue("status")}
            />
          )}
        </Form.Item>
        <Form.Item label="Состояние оплаты" shouldUpdate>
          {({ getFieldValue, setFieldValue }) => (
            <FilterCheckList
              options={getStateDataOptions(mapPaymentStateToLabel)}
              setValues={(v) => setFieldValue("statusPayment", v)}
              values={getFieldValue("statusPayment")}
            />
          )}
        </Form.Item>
      </div>
    </Form>
  );
};

export default OrderListFilterForm;
