"use client";

import { CategoriesCheckList, ProductsQueryParamsFormModel } from "@entities";
import { PriceRange } from "@shared/ui";
import { Button, Form, FormProps } from "antd-mobile";

import React, { FC } from "react";

type SearchBarHeaderProps = {
  form: FormProps["form"];
  onFinish: (data: ProductsQueryParamsFormModel) => void;
};

const SearchBarHeader: FC<SearchBarHeaderProps> = ({ form, onFinish }) => {
  return (
    <Form
      layout="vertical"
      form={form}
      footer={
        <Button block type="submit" color="primary" size="large">
          Применить фильтры
        </Button>
      }
      onFinish={() => {
        const categoryIds = form?.getFieldValue("categoryIds");
        const minPrice = form?.getFieldValue("minPrice");
        const maxPrice = form?.getFieldValue("maxPrice");
        onFinish({ categoryIds, maxPrice, minPrice });
      }}
    >
      <Form.Item label="Стоимость" shouldUpdate>
        {({ getFieldValue, setFieldValue }) => (
          <PriceRange
            max={500}
            min={0}
            onChange={([minPrice, maxPrice]) => {
              setFieldValue("minPrice", minPrice);
              setFieldValue("maxPrice", maxPrice);
            }}
            value={[getFieldValue("minPrice"), getFieldValue("maxPrice")]}
          />
        )}
      </Form.Item>
      <Form.Item label="Категории" shouldUpdate>
        {({ getFieldValue, setFieldValue }) => (
          <CategoriesCheckList
            getFieldValue={getFieldValue}
            setFieldValue={setFieldValue}
            openWhenHasValues
          />
        )}
      </Form.Item>
    </Form>
  );
};

export default SearchBarHeader;
