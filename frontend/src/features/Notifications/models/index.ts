import { ReactNode } from "react";

export type NotificationState = {
  id: string;
  message: string;
  isVisible: boolean;
  type: NotificationType;
  duration?: number;
} & NotificationConfig;

export type NotificationType = "error" | "success" | "info";

export type NotificationConfig = {
  color: "red" | "blue" | "green";
  title: string;
  icon?: ReactNode;
};

export type NotificationActionPayload = {
  message: string;
  type: NotificationType;
};
