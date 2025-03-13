"use client";
import { deleteCategoriesBack, getCategoriesBack } from "@entities";
import { QueryKey, routes } from "@shared/consts";
import { QueryEntityList } from "@widgets";
import { FC } from "react";

const CategoriesList: FC = () => {
  return (
    <>
      <QueryEntityList
        title="Категории"
        deleteMutation={{
          fn: deleteCategoriesBack,
          queryKeys: [[QueryKey.CategoriesListPage]],
        }}
        queryOptions={{
          mapper: (x) => ({
            title: x.name,
            url: x.id,
            id: x.id,
          }),
          getQueryKeys: (n) => [QueryKey.CategoriesListPage, n ?? ""],
          queryFn: getCategoriesBack,
        }}
        actions={{
          createUrl: routes.categories.create.url,
          editBaseUrl: routes.categories.edit.url,
        }}
      />
    </>
  );
};

export default CategoriesList;
