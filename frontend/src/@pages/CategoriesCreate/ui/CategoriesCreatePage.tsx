import CreateCategoryForm from "./CreateCategoryForm";
import { routes } from "@shared/consts";

export default function CategoriesCreatePage() {
  return (
    <div className="card-page">
      {/* <Breadcrumbs items={categoryCreateBreadcrumb} /> */}
      <h1 className="font-bold text-lg">{routes.categories.create.title}</h1>
      <CreateCategoryForm />
    </div>
  );
}
