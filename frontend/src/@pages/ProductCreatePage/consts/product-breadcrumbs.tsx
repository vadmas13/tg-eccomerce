import { routes } from "@shared/consts";
import { Breadcrumb } from "@shared/models";

export const productCreateBreadcrumb: Breadcrumb[] = [
  { title: routes.products.title, url: routes.products.url },
  { title: routes.products.create.title, url: routes.products.create.url },
];
