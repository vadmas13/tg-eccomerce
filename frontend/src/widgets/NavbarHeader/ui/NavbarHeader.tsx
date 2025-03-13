"use client";

import React, { FC, useState } from "react";
import { Form, Space } from "antd-mobile";
import { FilterOutline } from "antd-mobile-icons";
import { DebounceSearchBar, PopupComponent } from "@shared/ui";
import { SearchBarHeader } from "@features";
import {
  ProductsQueryParamsFormModel,
  setSearhListFilters,
  setSearhListName,
} from "@entities";
import { useAppDispatch } from "@shared/hooks";

type NavbarHeaderProps = {
  title?: string;
};

const NavbarHeader: FC<NavbarHeaderProps> = ({ title }) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm<ProductsQueryParamsFormModel>();
  const [visibleSearchBar, setVisibleSearchBar] = useState(false);

  const onSubmitFilters = (data: ProductsQueryParamsFormModel) => {
    dispatch(setSearhListFilters(data));
  };

  return (
    <>
      <div className="fixed top-0 bg-white shadow-md p-2 w-full flex justify-between z-10">
        <div></div>
        <div className="text-lg">
          <Space className="gap-4 mr-5">
            <DebounceSearchBar
              placeholder="Поиск товара"
              onChange={(v) => dispatch(setSearhListName(v))}
            />
          </Space>
          <Space className="gap-4 mr-3">
            <FilterOutline
              className="cursor-pointer"
              onClick={() => setVisibleSearchBar(true)}
            />
          </Space>
        </div>
      </div>
      <PopupComponent
        visible={visibleSearchBar}
        setVisible={setVisibleSearchBar}
        height="100vh"
      >
        <SearchBarHeader form={form} onFinish={onSubmitFilters} />
      </PopupComponent>
    </>
  );
};

export default NavbarHeader;
