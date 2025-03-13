"use client";

import {
  Category,
  CategoryForm,
  getCategoryById,
  updateCategory,
} from "@entities";
import { QueryKey, routes } from "@shared/consts";
import { query } from "@shared/hoc";
import { useListMutation } from "@shared/hooks";
import { useRouter } from "next/navigation";
import { FC } from "react";

type CategoryUpdateFormProps = {
  categoryId: string;
};

const CategoryUpdateForm: FC<CategoryUpdateFormProps> = ({ categoryId }) => {
  const router = useRouter();
  const { mutate, isPending } = useListMutation(
    [
      [QueryKey.CategoriesList],
      [QueryKey.CategoriesListPage],
      [QueryKey.CategoryById, categoryId],
    ],
    updateCategory,
    ({ name }: Category) =>
      (result: Category[] | Category) => {
        if (Array.isArray(result)) {
          return [...result].map((x) =>
            x.id === categoryId ? { ...x, name } : x,
          );
        }
        return { ...result, name };
      },
    (data, { showNotification }) => {
      showNotification(`Обновлена категория: ${data.name}`, "success");
      router.push(routes.categories.url);
    },
  );

  const CategoryFormComp = query(CategoryForm, {
    queryKey: [QueryKey.CategoryById, categoryId],
    queryFn: () => getCategoryById(categoryId),
  });

  return (
    <CategoryFormComp
      onFinish={({ name }) => mutate({ id: categoryId, name })}
      isPending={isPending}
    />
  );
};

export default CategoryUpdateForm;
