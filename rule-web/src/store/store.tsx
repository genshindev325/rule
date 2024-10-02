// /rule-web/store/store.tsx

import { configureStore } from "@reduxjs/toolkit";
import AuthReduer from "./features/auth/AuthSlice";
import NotificationReducer from "./features/notification/NotificationSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReduer,
    notification: NotificationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;