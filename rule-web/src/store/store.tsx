// /rule-web/store/store.tsx

import { configureStore } from "@reduxjs/toolkit";
import AuthReduer from "./features/auth/AuthSlice";

export const store = configureStore({
  reducer: {
    auth: AuthReduer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;