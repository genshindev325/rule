// components/auth/authContext.tsx

import { createContext, useContext, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn as reduxLogin, signOut as reduxLogout } from '@/app/store/features/auth/AuthSlice';
import { RootState } from '@/app/store/store';

interface ProfileProps {
  [key: string] : any
}

interface AuthContextType {
  isAuthenticated: boolean;
  email: string | null;
  role: string | null;
  profile: ProfileProps | null;
  signin: (email: string, role: string, profile: ProfileProps, token: string) => void;
  signout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, email, role, profile, token } = useSelector((state: RootState) => state.auth);

  const signin = (email: string, role: string, profile: ProfileProps, token: string) => {
    // Logic for logging in
    const user = {
      email: email,
      role: role,
      profile: profile,
    };
    dispatch(reduxLogin({ user: user, token: token }));
  };

  const signout = () => {
    // Logic for logging out
    dispatch(reduxLogout());
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, email, role, profile, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
