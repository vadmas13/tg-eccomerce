"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Notification } from "@shared/ui";

export type NotificationColor =
  | "default"
  | "alert"
  | "error"
  | "success"
  | "info";

interface NotificationType {
  id: number;
  message: string;
  duration: number;
  color?: NotificationColor;
}

interface NotificationContextType {
  showNotification: (
    message: string,
    color?: NotificationColor,
    duration?: number,
  ) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const showNotification = (
    message: string,
    color?: NotificationColor,
    duration = 3000,
  ) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, duration, color }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, duration);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className="fixed top-12 right-0">
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            message={notification.message}
            duration={notification.duration}
            color={notification.color}
          />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider",
    );
  }
  return context;
};
