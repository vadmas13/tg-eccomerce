export enum OrderStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  RETURNED = "RETURNED",
}

export const mapOrderStateToColor: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: "blue",
  [OrderStatus.COMPLETED]: "green",
  [OrderStatus.CANCELLED]: "red",
  [OrderStatus.SHIPPED]: "orange",
  [OrderStatus.DELIVERED]: "purple",
  [OrderStatus.RETURNED]: "gray",
};

export const mapOrderStateToLabel: Record<OrderStatus, string> = {
  [OrderStatus.PENDING]: "В обработке",
  [OrderStatus.COMPLETED]: "Завершен",
  [OrderStatus.CANCELLED]: "Отменен",
  [OrderStatus.SHIPPED]: "Отправлен",
  [OrderStatus.DELIVERED]: "Доставлен",
  [OrderStatus.RETURNED]: "Возвращен",
};
