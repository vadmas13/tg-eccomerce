"use client";

import { DataOption } from "@shared/models";
import { Tag } from "antd-mobile";
import { DeleteOutline } from "antd-mobile-icons";
import { FC } from "react";

type CheckedFilterTagsProps = {
  titleTabs?: string;
  setValues: (values: (string | number)[]) => void;
  valuesDataOptions: (DataOption | undefined)[];
};

const CheckedFilterTags: FC<CheckedFilterTagsProps> = ({
  titleTabs,
  valuesDataOptions,
  setValues,
}) => {
  return (
    <div className="flex gap-2 align-middle mb-2 justify-between">
      <div className="flex justify-start gap-2 align-middle">
        {titleTabs && <h3>{titleTabs}</h3>}
        {!valuesDataOptions?.length && (
          <span className="text-gray-300">Фильтр не установлен</span>
        )}
        {valuesDataOptions?.map((x) => (
          <Tag
            color="primary"
            fill="outline"
            key={x?.value}
            className="!rounded-full !text-sm !pl-2 !pr-2"
          >
            {x?.name}
          </Tag>
        ))}
      </div>
      <div>
        {!!valuesDataOptions?.length && (
          <DeleteOutline
            className="text-red-600 text-lg cursor-pointer"
            onClick={() => setValues([])}
          />
        )}
      </div>
    </div>
  );
};

export default CheckedFilterTags;
