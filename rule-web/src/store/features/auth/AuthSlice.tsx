// AuthSlice.ts file
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileProps {
  [key: string] : any
}

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  role: string | null;
  profile: ProfileProps | null;
  token: string | null;
}

const initialState: AuthState = {
  isAuthenticated: typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem('isAuthenticated') || 'false') : false,
  email: typeof window !== "undefined" ? sessionStorage.getItem('email') : null,
  role: typeof window !== "undefined" ? sessionStorage.getItem('role') : null,
  profile: typeof window !== "undefined" ? sessionStorage.getItem('profile') && JSON.parse(sessionStorage.getItem('profile') || '') : null,
  token: typeof window !== "undefined" ? sessionStorage.getItem('token') : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.isAuthenticated = true;
      state.email = action.payload.user.email;
      state.role = action.payload.user.role;
      state.profile = action.payload.user.profile;
      state.token = action.payload.token;

      sessionStorage.setItem('isAuthenticated', JSON.stringify(true));
      sessionStorage.setItem('email', action.payload.user.email);
      sessionStorage.setItem('role', action.payload.user.role);
      sessionStorage.setItem('profile', JSON.stringify(action.payload.user.profile));
      sessionStorage.setItem('token', action.payload.token);
      
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.email = null;
      state.role = null;
      state.profile = null;
      state.token = null;

      sessionStorage.setItem('isAuthenticated', JSON.stringify(true));
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('profile');
      sessionStorage.removeItem('token');
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;