"use client";

import { Button } from "antd-mobile";
import { AddSquareOutline } from "antd-mobile-icons";
import Link from "next/link";
import { FC } from "react";

type EntityListActionsProps = {
  createEntityUrl?: string;
  toggleIsCheckable: () => void;
  isCheckable: boolean;
};

const EntityListActions: FC<EntityListActionsProps> = ({
  createEntityUrl,
  isCheckable,
  toggleIsCheckable,
}) => {
  return (
    <div className="flex justify-end gap-2 align-middle">
      <Button
        color="default"
        size="large"
        className="!p-1 !pl-5 !pr-5"
        onClick={toggleIsCheckable}
      >
        {isCheckable ? "Отменить" : "Выбрать"}
      </Button>
      {createEntityUrl && (
        <Link href={createEntityUrl}>
          <Button
            color="success"
            size="large"
            className="!p-1 !w-9 !h-9 !flex !justify-center !items-center"
          >
            <AddSquareOutline />
          </Button>
        </Link>
      )}
    </div>
  );
};

export default EntityListActions;
