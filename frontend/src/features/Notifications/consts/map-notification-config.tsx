import { NotificationType, NotificationConfig } from "../models";
import { ReactNode } from "react";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";

export const mapNotificationConfig: Record<
  NotificationType,
  NotificationConfig
> = {
  error: {
    color: "red",
    title: "Ошибка",
  },
  success: {
    color: "green",
    title: "Запрос выполнен",
  },
  info: {
    color: "blue",
    title: "Информационное сообщение",
  },
};

export const mapNotificationIcon: Record<NotificationType, ReactNode> = {
  error: <ExclamationCircleOutlined className="!text-[30px]" />,
  success: <CheckCircleOutlined className="!text-[30px]" />,
  info: <QuestionCircleOutlined className="!text-[30px]" />,
};
