// AuthSlice.ts file
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setItem, getItem, removeItem } from '@/app/components/utils/storage';

interface AuthState {
  isAuthenticated: boolean;
  userRole: string | null;
  userEmail: string | null;
  userName: string | null;
  token: string | null;
}

let isAuthenticated = false;
let userRole = '';
let userEmail = '';
let userName = '';
let token = '';

async () => {
  isAuthenticated = await getItem('isAuthenticated');
  userRole = await getItem('userRole');
  userEmail = await getItem('userEmail');
  userName = await getItem('userName');
  token = await getItem('token');
}

const initialState: AuthState = {
  isAuthenticated: isAuthenticated || false,
  userRole: userRole || null,
  userEmail: userEmail || null,
  userName: userName || null,
  token: token || null
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

      setItem('isAuthenticated', JSON.stringify(true));
      setItem('token', action.payload.token);
      setItem('userName', action.payload.user.userName);
      setItem('userEmail', action.payload.user.userEmail);
      setItem('userRole', action.payload.user.userRole);
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.userRole = null;
      state.userEmail = null;
      state.userName = null;
      state.token = null;

      setItem('isAuthenticated', JSON.stringify(false));
      removeItem('token');
      removeItem('userName');
      removeItem('userEmail');
      removeItem('userRole');
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;