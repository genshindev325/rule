// AuthSlice.ts file
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProfile {
  _id: string;
  email: string;
  storeID: string;
  storeName: string;
  storeGenre: string;
  foodGenre: string;
  cookingGenre: string;
  address: string;
  access: string[];
  storeImages: string[];
  description: string;
  storeLat: number;
  storeLng: number;
  status: string;
}

interface AuthState {
  isAuthenticated: boolean;
  email: string | null;
  role: string | null;
  profile: IProfile | null;
  token: string | null;
  selectedMenu: string;
  previewMenu: string;
}

const initialState: AuthState = {
  isAuthenticated: typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem('isAuthenticated') || 'false') : false,
  email: typeof window !== "undefined" ? sessionStorage.getItem('email') : null,
  role: typeof window !== "undefined" ? sessionStorage.getItem('role') : null,
  profile: typeof window !== "undefined" ? sessionStorage.getItem('profile') && JSON.parse(sessionStorage.getItem('profile') || '') : null,
  token: typeof window !== "undefined" ? sessionStorage.getItem('token') : null,
  selectedMenu: '',
  previewMenu: '',
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
      sessionStorage.setItem('selectedMenu', '');
      sessionStorage.setItem('previewMenu', '');
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.email = null;
      state.role = null;
      state.profile = null;
      state.token = null;

      sessionStorage.setItem('isAuthenticated', JSON.stringify(false));
      sessionStorage.removeItem('email');
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('profile');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('selectedMenu');
      sessionStorage.removeItem('previewMenu');
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;