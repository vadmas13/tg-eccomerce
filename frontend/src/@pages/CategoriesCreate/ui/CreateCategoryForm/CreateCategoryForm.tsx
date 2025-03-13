"use client";

import { Category, CategoryForm, createCategory } from "@entities";
import { QueryKey, routes } from "@shared/consts";
import { useListMutation } from "@shared/hooks";
import { PaginationDto } from "@shared/models";
import { useRouter } from "next/navigation";
import { FC } from "react";

const CreateCategoryForm: FC = () => {
  const router = useRouter();

  const { mutate, isPending } = useListMutation(
    [[QueryKey.CategoriesList], [QueryKey.CategoriesListPage]],
    createCategory,
    (data) => (cash: PaginationDto<Category[]>) => {
      return { ...cash, data: [...(cash?.data ? cash.data : []), data] };
    },
    (data, { showNotification }) => {
      showNotification(`Добавлена категория: ${data.name}`, "success");
      router.push(routes.categories.url);
    },
  );

  return (
    <CategoryForm
      onFinish={({ name }) => mutate(name)}
      isPending={isPending}
      isCreate
    />
  );
};

export default CreateCategoryForm;
