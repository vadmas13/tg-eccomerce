import { routes } from "@shared/consts";
import { Breadcrumb } from "@shared/models";

export const categoryCreateBreadcrumb: Breadcrumb[] = [
  { title: routes.categories.title, url: routes.categories.url },
  { title: routes.categories.create.title, url: routes.categories.create.url },
];
