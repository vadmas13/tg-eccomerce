import { NextHeaders, routes } from "@shared/consts";
import { headers } from "next/headers";
import { FC } from "react";
import CreateOrderPageUI from "./CreateOrderPageUI";

const CreateOrderPage: FC = () => {
  const userId = headers().get(NextHeaders.XUserId) as string;

  return (
    <div>
      <h1 className="font-bold text-lg">{routes.base.order.create.title}</h1>
      <CreateOrderPageUI userId={userId} />
    </div>
  );
};

export default CreateOrderPage;
