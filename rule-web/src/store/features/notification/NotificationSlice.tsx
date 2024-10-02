// notificationSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Notification {
  _id: string;
  entityId: string;
  entityName: string;
  role: string;
  message: string;
  show: string;
  status: string;
  createdAt: string;
}

interface NotificationState {
  notifications: Notification[];
}

const initialState: NotificationState = {
  notifications: [],
};

const notificationSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload;
    },
    markAsRead: (state, action: PayloadAction<string[]>) => {
      state.notifications = state.notifications.map(notification => 
        action.payload.includes(notification._id) && notification.status === 'unread'
          ? { ...notification, status: 'read' }
          : notification
      );
    },
  },
});

export const { setNotifications, markAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
