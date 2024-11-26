// AuthSlice.ts file
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setItem, getItem, removeItem } from '@/app/utils/storage';

interface IProfile {
  _id: string;
  email: string;
  password: string;
  storeID: string;
  storeName: string;
  storeGenre: string;
  foodGenre: string;
  cookingGenre: string;
  address: string;
  access: string[];
  storeImages: string[];
  description: string;
  monthlyRate: number;
  rating: number;
  ratingCount: number;
  storeLat: number;
  storeLng: number;
  status: string;
  createdAt: Date;
  creditCard: string;
  bankName: string;
  branchName: string;
  accountNumber: number;
  accountHolder: string;
}

interface AuthState {
  isAuthenticated: boolean;
  role: string | null;
  email: string | null;
  profile: IProfile | null;
  token: string | null;
}

let isAuthenticated = false;
let role = '';
let email = '';
let profile = '';
let token = '';

async () => {
  isAuthenticated = await getItem('isAuthenticated');
  role = await getItem('role');
  email = await getItem('email');
  profile = await getItem('profile');
  token = await getItem('token');
}

const initialState: AuthState = {
  isAuthenticated: isAuthenticated || false,
  role: role && JSON.parse(role) || null,
  email: email || null,
  profile: profile && JSON.parse(profile) || null,
  token: token || null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<{ user: any; token: string }>) => {
      state.isAuthenticated = true;
      state.role = action.payload.user.role;
      state.email = action.payload.user.email;
      state.profile = action.payload.user.profile;
      state.token = action.payload.token;

      setItem('isAuthenticated', JSON.stringify(true));
      setItem('token', action.payload.token);
      setItem('profile', JSON.stringify(action.payload.user.profile));
      setItem('email', action.payload.user.email);
      setItem('role', action.payload.user.role);
    },
    signOut: (state) => {
      state.isAuthenticated = false;
      state.role = null;
      state.email = null;
      state.profile = null;
      state.token = null;

      setItem('isAuthenticated', JSON.stringify(false));
      removeItem('token');
      removeItem('profile');
      removeItem('email');
      removeItem('role');
    },
  },
});

export const { signIn, signOut } = authSlice.actions;

export default authSlice.reducer;