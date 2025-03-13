"use client";

import { ErrorBlock } from "antd-mobile";
import { FC } from "react";

type ErrorComponentProps = {
  error?: Error | null;
};

const ErrorComponent: FC<ErrorComponentProps> = ({ error }) => {
  return (
    <div className="flex justify-center align-middle">
      <ErrorBlock
        className="flex flex-col justify-center align-middle"
        title={error?.message ?? "Непредвиденная ошибка"}
        description=""
      />
    </div>
  );
};

export default ErrorComponent;
