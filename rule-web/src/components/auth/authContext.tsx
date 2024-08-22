// components/auth/authContext.tsx

import { createContext, useContext, ReactNode } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn as reduxLogin, signOut as reduxLogout } from '@/store/features/auth/AuthSlice';
import { RootState } from '@/store/store';

interface AuthContextType {
  isAuthenticated: boolean;
  userName: string | null;
  userEmail: string | null;
  userRole: string | null;
  signin: (userName: string, userEmail: string, userRole: string, token: string) => void;
  signout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const { userEmail, userName, userRole, token, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const signin = (userEmail: string, userName: string, userRole: string, token: string) => {
    // Logic for logging in
    const user = {
      userName: userName,
      userEmail: userEmail,
      userRole: userRole
    }
    dispatch(reduxLogin({ user: user, token: token }));
  };

  const signout = () => {
    // Logic for logging out
    dispatch(reduxLogout());
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, userEmail, userRole, signin, signout }}>
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
