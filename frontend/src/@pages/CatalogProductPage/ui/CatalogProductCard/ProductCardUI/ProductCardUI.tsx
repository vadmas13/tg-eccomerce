"use client";

import { ProductFormModel, ProductPrice } from "@entities";
import { routes } from "@shared/consts";
import { AdminButtonLink, EntityAttributes, ImageSlider } from "@shared/ui";
import { getIdLink } from "@shared/utils";
import { Tag } from "antd-mobile";
import { EditSOutline } from "antd-mobile-icons";
import { FC } from "react";
import ProductCardQuantity from "./ProductCardQuantity";

type ProductCardProps = {
  data?: ProductFormModel;
  onQuantityChange: (quantity: number) => void;
  isAdmin: boolean;
  loading: boolean;
};

const ProductCardUI: FC<ProductCardProps> = ({
  data,
  isAdmin,
  onQuantityChange,
  loading,
}) => {
  return (
    <div className="card-page">
      {isAdmin && data?.id && (
        <div className="flex justify-end mb-4">
          <AdminButtonLink
            href={getIdLink(routes.products.edit.url, data.id)}
            icon={<EditSOutline />}
          >
            Редактировать
          </AdminButtonLink>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 h-[250px] w-full rounded-lg overflow-hidden">
          <ImageSlider images={data?.images} />
        </div>
        <div className="col-span-1 p-4 flex flex-col ">
          <p className="text-xl font-bold text-500">{data?.name}</p>
          <p className="text-md">{data?.description}</p>
          {data?.attributes && (
            <EntityAttributes attributesString={data.attributes} />
          )}
          {data?.categories && (
            <div className="mt-6">
              <h4 className="mb-2 font-bold">Категории</h4>
              <div className="flex gap-2">
                {data.categories.map((x) => (
                  <Tag key={x.id} color="primary" fill="outline">
                    {x.name}
                  </Tag>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="col-span-1 p-4 flex flex-col justify-between rounded-lg shadow">
          {data?.price && (
            <ProductPrice
              size="large"
              price={data.price}
              discountedPrice={data.discountedPrice}
            />
          )}
          <ProductCardQuantity
            onQuantityChange={onQuantityChange}
            quantity={data?.addedToCartCount}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCardUI;
