"use client";

import React, { FC } from "react";
import { Form, Space } from "antd-mobile";
import { DebounceSearchBar } from "@shared/ui";
import { EntityListFilter, SearchBarHeader } from "@features";
import {
  ProductsQueryParamsFormModel,
  setSearhListFilters,
  setSearhListName,
} from "@entities";
import { useAppDispatch, useAppSelector } from "@shared/hooks";

type NavbarHeaderProps = {
  title?: string;
};

const NavbarHeader: FC<NavbarHeaderProps> = ({ title }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<ProductsQueryParamsFormModel>();
  const searchListParamsCount = useAppSelector(
    (x) => x.product.searchListParamsCount,
  );

  const onSubmitFilters = (data: ProductsQueryParamsFormModel) => {
    dispatch(setSearhListFilters(data));
  };

  return (
    <>
      <div className="fixed top-0 bg-white shadow-md p-2 w-full flex justify-between z-10">
        <div></div>
        <div className="text-lg flex items-center">
          <Space className="gap-4 mr-5">
            <DebounceSearchBar
              placeholder="Поиск товара"
              onChange={(v) => dispatch(setSearhListName(v))}
            />
          </Space>
          <EntityListFilter count={searchListParamsCount}>
            <SearchBarHeader form={form} onFinish={onSubmitFilters} />
          </EntityListFilter>
        </div>
      </div>
    </>
  );
};

export default NavbarHeader;
