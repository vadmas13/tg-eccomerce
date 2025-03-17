"use client";

import { getCategoriesClient } from "@entities/categories/api";
import { QueryKey } from "@shared/consts";
import { query } from "@shared/hoc";
import { FilterCheckListQuery } from "@shared/ui";
import { NamePath } from "antd-mobile/es/components/form";
import { FC, useMemo } from "react";

type CategoriesCheckListProps = {
  getFieldValue: (name: NamePath) => any;
  setFieldValue: (name: NamePath, value: any) => void;
  openWhenHasValues?: boolean;
};

const CategoriesCheckList: FC<CategoriesCheckListProps> = ({
  getFieldValue,
  setFieldValue,
  openWhenHasValues,
}) => {
  const CategoriesList = useMemo(
    () =>
      query(FilterCheckListQuery, {
        queryKey: [QueryKey.CategoriesList],
        queryFn: () => getCategoriesClient(),
        mapper: (data) =>
          data?.data?.map((x) => ({ name: x.name, value: x.id })),
      }),
    [],
  );

  return (
    <CategoriesList
      queryOptions={{
        getQueryKeys: (name) => [QueryKey.CategoriesList, name ?? ""],
        queryFn: ({ name }) =>
          getCategoriesClient({
            name,
          }),
      }}
      openWhenHasValues={openWhenHasValues}
      values={getFieldValue("categoryIds")}
      setValues={(v) => setFieldValue("categoryIds", v)}
    />
  );
};

export default CategoriesCheckList;
