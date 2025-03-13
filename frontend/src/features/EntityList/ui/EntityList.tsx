"use client";

import { Dialog, List, SwipeAction } from "antd-mobile";
import { FC, ReactNode } from "react";
import styles from "./style.module.scss";
import classNames from "classnames";
import { CheckOutline, DeleteOutline, EditSOutline } from "antd-mobile-icons";
import { useRouter } from "next/navigation";
import { getIdLink } from "@shared/utils";

type EntityListProps = {
  collection: { title: string; id: string; titleNode?: ReactNode }[];
  editBaseUrl?: string;
  onDelete: (id: string) => void;
  handleCheckItem: (id: string) => void;
  checkedIds: string[];
  isCheckable?: boolean;
};

const EntityList: FC<EntityListProps> = ({
  collection,
  onDelete,
  checkedIds,
  handleCheckItem,
  editBaseUrl,
  isCheckable,
}) => {
  const router = useRouter();

  const handleNavigate = (id: string) => {
    editBaseUrl && router.push(getIdLink(editBaseUrl, id));
  };

  const handleClickItem = (id: string) => {
    if (!isCheckable) {
      handleNavigate(id);
      return;
    }

    handleCheckItem(id);
  };
  return (
    <List className={classNames("mt-2", styles.entityList)}>
      {collection.map((x) => (
        <SwipeAction
          key={x.id}
          className="text-sm"
          rightActions={[
            {
              key: "edit",
              text: <EditSOutline />,
              color: "warning",
              onClick: () => handleNavigate(x.id),
            },
            {
              key: "delete",
              text: <DeleteOutline />,
              color: "danger",
              onClick: async () => {
                await Dialog.confirm({
                  content: `Вы действительно хотите удалить элемент "${x.title}"?`,
                  onConfirm: () => onDelete(x.id),
                  confirmText: "Да",
                  cancelText: "Нет",
                });
              },
            },
          ]}
        >
          <List.Item
            className={checkedIds.includes(x.id) ? "entityListItem" : ""}
            onClick={() => handleClickItem(x.id)}
          >
            <div
              className={classNames("pl-2 flex justify-between", {
                ["bg-blue-50 pt-3 pb-3"]: checkedIds.includes(x.id),
              })}
            >
              <div>{x.titleNode ?? x.title}</div>
              {checkedIds.includes(x.id) && (
                <div className="mr-10 text-blue-500">
                  <CheckOutline />
                </div>
              )}
            </div>
          </List.Item>
        </SwipeAction>
      ))}
    </List>
  );
};

export default EntityList;
