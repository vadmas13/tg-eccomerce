"use client";

import React from "react";
import { useAppSelector } from "@shared/hooks";
import NotificationComponent from "../NotificationComponent";

const NotificationsList: React.FC = ({}) => {
  const { notifications } = useAppSelector((x) => x.notification);
  console.log("notifications", notifications);
  return (
    <div className="fixed right-2 top-[54px] z-20 bg-white">
      {notifications.map((n) => (
        <NotificationComponent key={n.id} n={n} />
      ))}
    </div>
  );
};

export default NotificationsList;
