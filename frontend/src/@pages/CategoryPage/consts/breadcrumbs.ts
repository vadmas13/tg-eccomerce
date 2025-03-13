import { routes } from "@shared/consts";
import { Breadcrumb } from "@shared/models";

export const categoryPageBreadcrumb: Breadcrumb[] = [
  { title: routes.categories.title, url: routes.categories.url },
  { title: routes.categories.edit.title, url: routes.categories.edit.url },
];
