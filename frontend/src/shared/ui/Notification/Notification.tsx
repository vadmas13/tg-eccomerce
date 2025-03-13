"use client";

import React, { useEffect, useState } from "react";
import { NoticeBar } from "antd-mobile";

interface NotificationProps {
  message: string;
  duration?: number;
  color?: "default" | "alert" | "error" | "success" | "info";
}

const Notification: React.FC<NotificationProps> = ({
  message,
  color,
  duration = 3000,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <NoticeBar
      className="mt-2 ml-6 mr-6"
      onClose={() => setVisible(false)}
      shape="rounded"
      content={message}
      color={color}
    />
  );
};

export default Notification;
