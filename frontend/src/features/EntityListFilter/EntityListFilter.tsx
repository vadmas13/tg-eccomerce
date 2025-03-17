"use client";

import { EntityListPopupContext } from "@shared/context";
import { PopupComponent } from "@shared/ui";
import { Badge, Space } from "antd-mobile";
import { FilterOutline } from "antd-mobile-icons";
import { FC, ReactNode, useState } from "react";

type EntityListFilterProps = {
  children: ReactNode;
  count?: number;
};

const EntityListFilter: FC<EntityListFilterProps> = ({ children, count }) => {
  const [visibleSearchBar, setVisibleSearchBar] = useState(false);

  const FilterIcon = (
    <FilterOutline
      className="cursor-pointer text-[24px] active:bg-gray-50"
      onClick={() => setVisibleSearchBar(true)}
    />
  );
  return (
    <EntityListPopupContext.Provider value={{ setVisibleSearchBar }}>
      <Space className="gap-4 mr-3">
        {count && count > 0 ? (
          <Badge content={count}>{FilterIcon}</Badge>
        ) : (
          FilterIcon
        )}
      </Space>
      <PopupComponent
        visible={visibleSearchBar}
        setVisible={setVisibleSearchBar}
        height="100vh"
      >
        {children}
      </PopupComponent>
    </EntityListPopupContext.Provider>
  );
};

export default EntityListFilter;
