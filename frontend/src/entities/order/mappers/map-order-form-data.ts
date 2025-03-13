import { FormInstance } from "antd-mobile/es/components/form";
import { OrderCreateFormModel } from "../models";
import { OrderAddressType } from "../consts";

export const mapOrderFormData = (form: FormInstance): OrderCreateFormModel => {
  const values = form.getFieldsValue();
  const address = form.getFieldValue("address");
  const addressType =
    form.getFieldValue("addressType") ?? OrderAddressType.SDEK;
  return {
    ...values,
    address,
    addressType,
  };
};
