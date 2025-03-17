"use client";

import { formatDate } from "../../utils";
import { DatePicker, Input } from "antd-mobile";
import { FC, useState } from "react";

type DatePickerProps = {
  setValue: (v: string) => void;
  value?: string;
};

const DatePickerCustom: FC<DatePickerProps> = ({ setValue, value }) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <Input
        onClick={() => setVisible(true)}
        value={value ? formatDate(value, true) : undefined}
        placeholder="Выберите дату"
      />
      <DatePicker
        visible={visible}
        defaultValue={new Date()}
        max={new Date()}
        onClose={() => setVisible(false)}
        onConfirm={(v) => setValue(v.toISOString())}
        confirmText="Применить"
        cancelText="Отмена"
      />
    </>
  );
};

export default DatePickerCustom;
