// /rule-web/store/store.tsx

import { configureStore } from "@reduxjs/toolkit";
import AuthReduer from "./features/auth/AuthSlice";
import EventReducer from './features/event/EventSlice';

export const store = configureStore({
  reducer: {
    auth: AuthReduer,
    event: EventReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;