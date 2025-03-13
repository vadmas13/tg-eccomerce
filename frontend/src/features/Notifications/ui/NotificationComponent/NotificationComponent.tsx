"use client";

import { FC, useEffect } from "react";
import { NotificationState } from "../../models";
import { mapNotificationIcon, notificationTimer } from "../../consts";
import { useAppDispatch } from "@shared/hooks";
import { removeNotification, setInvisible } from "../../slices";
import { CloseOutlined } from "@ant-design/icons";

type NotificationProps = {
  n: NotificationState;
};

const NotificationComponent: FC<NotificationProps> = ({ n }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setInvisible(n.id));
      const removeTimeoutId = setTimeout(() => {
        dispatch(removeNotification(n.id));
      }, 500);

      return () => clearTimeout(removeTimeoutId);
    }, n.duration ?? notificationTimer);

    return () => clearTimeout(timeoutId);
  }, [dispatch, n.id]);

  const handleClose = () => {
    dispatch(setInvisible(n.id));
    setTimeout(() => {
      dispatch(removeNotification(n.id));
    }, 500);
  };

  return (
    <div
      className={`transform transition-all duration-500 ease-in-out mb-2 w-[300px] ${
        n.isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
      } relative shadow-lg p-4`}
    >
      <div
        onClick={handleClose}
        className="absolute right-2 top-2 cursor-pointer"
      >
        <CloseOutlined />
      </div>
      <div className="grid grid-cols-[20px_1fr] gap-6">
        <div style={{ color: n.color }} className="opacity-50">
          {mapNotificationIcon[n.type]}
        </div>
        <div>
          <div className="font-bold">{n.title}</div>
          <div>{n.message}</div>
        </div>
      </div>
    </div>
  );
};

export default NotificationComponent;
