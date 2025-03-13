import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { NotificationState } from "../models";
import { mapNotificationConfig } from "../consts";

const notificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [] as NotificationState[],
  },
  reducers: {
    addNotification(state, action) {
      const { message, type, title, color, duration } =
        action.payload as NotificationState;
      const config = mapNotificationConfig[type];
      const newNotification: NotificationState = {
        id: uuidv4(),
        isVisible: true,
        title: title ?? config.title,
        color: color ?? config.color,
        duration,
        type,
        message,
      };
      state.notifications.push(newNotification);
    },
    removeNotification(state, action) {
      const id = action.payload;
      state.notifications = state.notifications.filter((n) => n.id !== id);
    },
    setInvisible(state, action) {
      const id = action.payload;
      const n = state.notifications.find((n) => n.id === id);
      if (n) {
        n.isVisible = false;
      }
    },
  },
});

export const { addNotification, removeNotification, setInvisible } =
  notificationSlice.actions;
export default notificationSlice.reducer;
