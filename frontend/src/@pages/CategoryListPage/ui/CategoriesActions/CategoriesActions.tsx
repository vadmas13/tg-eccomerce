"use client";

import { routes } from "@shared/consts";
import { Button } from "antd-mobile";
import { AddSquareOutline } from "antd-mobile-icons";
import Link from "next/link";

const CategoriesActions = () => {
  return (
    <div className="flex justify-end gap-2 align-middle">
      <Button color="default" size="large" className="!p-1 !pl-5 !pr-5">
        Выбрать
      </Button>
      <Link href={routes.categories.create.url}>
        <Button
          color="success"
          size="large"
          className="!p-1 !w-9 !h-9 !flex !justify-center !items-center"
        >
          <AddSquareOutline />
        </Button>
      </Link>
    </div>
  );
};

export default CategoriesActions;
