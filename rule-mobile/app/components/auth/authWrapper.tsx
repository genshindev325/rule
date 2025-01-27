// components/auth/authWrapper.tsx

import { ReactNode, useState, useEffect } from 'react';
import { useAuth } from '@/app/components/auth/authContext';
import { useIonRouter } from '@ionic/react';
import { useLocation } from 'react-router-dom';

interface AuthWrapperProps {
  allowedRoles: string[];
  children: ReactNode;
}

const AuthWrapper = ({ allowedRoles, children }: AuthWrapperProps) => {
  const { isAuthenticated, role } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const router = useIonRouter();
  const location = useLocation();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const publicRoutes = ['/auth/login', '/auth/passwordResetSend', '/auth/signup'];
    if (
      isClient &&
      !publicRoutes.includes(location.pathname) &&
      (!isAuthenticated || !allowedRoles.includes(role || ''))
    ) {
      router.push('/auth/unauthorized');
    }
  }, [isClient, isAuthenticated, role, router]);

  if (!isClient) {
    return null;
  }

  return <>{children}</>;
};

export default AuthWrapper;
