import { routes } from "@shared/consts";
import { FC } from "react";
import ProductCreateForm from "./ProductCreateForm";

const ProductCreatePage: FC = () => {
  return (
    <div className="card-page">
      {/* <Breadcrumbs items={productCreateBreadcrumb} /> */}
      <h1 className="font-bold text-lg">{routes.products.create.title}</h1>
      <ProductCreateForm />
    </div>
  );
};

export default ProductCreatePage;
