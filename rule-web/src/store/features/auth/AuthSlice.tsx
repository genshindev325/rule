// AuthSlice.ts file
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  userRole: string | null;
  userEmail: string | null;
  userName: string | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem('isAuthenticated') || 'false') : false,
  userRole: typeof window !== "undefined" ? sessionStorage.getItem('userRole') : null,
  userEmail: typeof window !== "undefined" ? sessionStorage.getItem('userEmail') : null,
  userName: typeof window !== "undefined" ? sessionStorage.getItem('userName') : null,
  token: typeof window !== "undefined" ? sessionStorage.getItem('token') : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.isAuthenticated = true;
      state.userRole = action.payload.user.userRole;
      state.userEmail = action.payload.user.userEmail;
      state.userName = action.payload.user.userName;
      state.token = action.payload.token;

      sessionStorage.setItem('isAuthenticated', JSON.stringify(true));
      sessionStorage.setItem('token', action.payload.token);
      sessionStorage.setItem('userName', action.payload.user.userName);
      sessionStorage.setItem('userEmail', action.payload.user.userEmail);
      sessionStorage.setItem('userRole', action.payload.user.userRole);
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.userRole = null;
      state.userEmail = null;
      state.userName = null;
      state.token = null;

      sessionStorage.setItem('isAuthenticated', JSON.stringify(true));
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('userName');
      sessionStorage.removeItem('userEmail');
      sessionStorage.removeItem('userRole');
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;