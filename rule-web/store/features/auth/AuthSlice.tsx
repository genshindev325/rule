// AuthSlice.ts file
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  userId: number | null;
  userEmail: string;
  userName: string;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userId: null,
  userEmail: '',
  userName: '',
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.isAuthenticated = true;
      state.userId = action.payload.user.id;
      state.userEmail = action.payload.user.userEmail;
      state.userName = action.payload.user.userName;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.isAuthenticated = false;
      state.userId = null;
      state.userEmail = '';
      state.userName = '';
      state.token = null;
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;

export default authSlice.reducer;