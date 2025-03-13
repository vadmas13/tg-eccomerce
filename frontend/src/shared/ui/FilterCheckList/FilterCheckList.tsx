"use client";

import { DataOption, PaginationDto } from "@shared/models";
import { CheckList, Collapse } from "antd-mobile";
import { CollapsePanel } from "antd-mobile/es/components/collapse/collapse";
import { FC, useMemo, useState } from "react";
import DebounceSearchBar from "../DebounceSearchBar";
import QueryListContainer from "../QueryListContainer";
import CheckedFilterTags from "../CheckedFilterTags";
import classNames from "classnames";
import styles from "./styles.module.scss";

type FilterCheckListProps = {
  data?: DataOption[];
  values: (string | number)[];
  setValues: (values: (string | number)[]) => void;
  collapseTitle?: string;
  titleTabs?: string;
  queryOptions: {
    getQueryKeys: (name?: string) => string[];
    queryFn: (dto: {
      name?: string;
    }) => Promise<PaginationDto<{ id: string; name: string }[]> | undefined>;
  };
  openWhenHasValues?: boolean;
};

const FilterCheckList: FC<FilterCheckListProps> = ({
  data,
  values,
  setValues,
  titleTabs,
  collapseTitle,
  queryOptions,
  openWhenHasValues,
}) => {
  const [activeKey, setActiveKey] = useState<string | undefined>();
  const [name, setName] = useState<string>();
  const valuesDataOptions = useMemo(
    () => values?.map((x) => data?.find((xx) => xx.value === x)),
    [values],
  );

  return (
    <div className={classNames("!text-sm", styles.filterCkeckList)}>
      <CheckedFilterTags
        valuesDataOptions={valuesDataOptions}
        setValues={setValues}
        titleTabs={titleTabs}
      />
      <Collapse activeKey={activeKey} accordion>
        <CollapsePanel
          className="!text-sm"
          title={
            collapseTitle ?? (
              <div
                className="pt-3 pb-3"
                onClick={() => {
                  setActiveKey((prev) => (prev ? undefined : "CollapsePanel"));
                }}
              >
                Выберите
              </div>
            )
          }
          key="CollapsePanel"
        >
          <DebounceSearchBar onChange={setName} />
          <QueryListContainer
            queryOptions={{
              queryKey: queryOptions.getQueryKeys(name),
              queryFn: () =>
                queryOptions.queryFn({
                  name,
                }),
            }}
          >
            {({ data: dto }) => (
              <div className="h-80 overflow-y-scroll">
                <CheckList
                  multiple
                  defaultValue={values}
                  value={values}
                  onChange={setValues}
                >
                  {dto?.data?.map((x) => (
                    <CheckList.Item
                      key={x.id}
                      value={x.id}
                      className={classNames({
                        ["!bg-blue-50"]: values?.includes(x.id),
                      })}
                    >
                      {x.name}
                    </CheckList.Item>
                  ))}
                </CheckList>
              </div>
            )}
          </QueryListContainer>
        </CollapsePanel>
      </Collapse>
    </div>
  );
};

export default FilterCheckList;
