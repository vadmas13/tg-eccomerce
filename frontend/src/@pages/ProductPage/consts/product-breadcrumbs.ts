import { routes } from "@shared/consts";
import { Breadcrumb } from "@shared/models";

export const productPageBreadcrumb: Breadcrumb[] = [
  { title: routes.products.title, url: routes.products.url },
  { title: routes.products.edit.title, url: routes.products.edit.url },
];
