// components/auth/authWrapper.tsx

import { ReactNode, useState, useEffect } from 'react';
import { useAuth } from '@/app/components/auth/authContext';
import { useIonRouter } from '@ionic/react';

interface AuthWrapperProps {
  allowedRoles: string[];
  children: ReactNode;
}

const AuthWrapper = ({ allowedRoles, children }: AuthWrapperProps) => {
  const { isAuthenticated, userRole } = useAuth();
  const router = useIonRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && (!isAuthenticated || !allowedRoles.includes(userRole || ''))) {
      router.push('/auth/unauthorized');
    }
  }, [isClient, isAuthenticated, userRole, router]);

  if (!isClient) {    
    return null;
  }

  return <>{children}</>;
};

export default AuthWrapper;
