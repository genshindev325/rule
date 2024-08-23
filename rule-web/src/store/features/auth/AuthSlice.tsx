// AuthSlice.ts file
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileProps {
  [key: string] : any
}

interface AuthState {
  isAuthenticated: boolean;
  userRole: string | null;
  userEmail: string | null;
  profile: ProfileProps | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem('isAuthenticated') || 'false') : false,
  userRole: typeof window !== "undefined" ? sessionStorage.getItem('userRole') : null,
  userEmail: typeof window !== "undefined" ? sessionStorage.getItem('userEmail') : null,
  profile: typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem('profile') || '') : null,
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
      state.profile = action.payload.user.profile;
      state.token = action.payload.token;

      sessionStorage.setItem('isAuthenticated', JSON.stringify(true));
      sessionStorage.setItem('token', action.payload.token);
      sessionStorage.setItem('profile', action.payload.user.profile);
      sessionStorage.setItem('userEmail', action.payload.user.userEmail);
      sessionStorage.setItem('userRole', action.payload.user.userRole);
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.userRole = null;
      state.userEmail = null;
      state.profile = null;
      state.token = null;

      sessionStorage.setItem('isAuthenticated', JSON.stringify(true));
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('profile');
      sessionStorage.removeItem('userEmail');
      sessionStorage.removeItem('userRole');
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;