"use client";

import { Dialog } from "antd-mobile";
import { DeleteOutline } from "antd-mobile-icons";
import { FC } from "react";

type CheckedListActionsProps = {
  checkedIds: string[];
  deleteItem: (id: string) => void;
  onSuccess?: () => void;
};

const CheckedListActions: FC<CheckedListActionsProps> = ({
  checkedIds,
  deleteItem,
  onSuccess,
}) => {
  const handleDeleteChecked = async () => {
    await Dialog.confirm({
      content: `Вы действительно хотите удалить ${checkedIds.length} выбранных элементов?`,
      onConfirm: () =>
        Promise.all(checkedIds.map((x) => deleteItem(x))).then(() =>
          onSuccess?.(),
        ),
      confirmText: "Да",
      cancelText: "Нет",
    });
  };

  return (
    !!checkedIds.length && (
      <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 mb-4 z-50">
        <div className="flex gap-5">
          <div>Выбрано элементов: {checkedIds.length}</div>
          <DeleteOutline
            className="text-lg text-red-700 cursor-pointer"
            onClick={handleDeleteChecked}
          />
        </div>
      </div>
    )
  );
};

export default CheckedListActions;
