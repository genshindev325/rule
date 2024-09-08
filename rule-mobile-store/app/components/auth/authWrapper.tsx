// components/auth/authWrapper.tsx

import { ReactNode, useState, useEffect } from 'react';
import { useAuth } from '@/app/components/auth/authContext';
import { useRouter } from 'next/navigation';

interface AuthWrapperProps {
  allowedRoles: string[];
  children: ReactNode;
}

const AuthWrapper = ({ allowedRoles, children }: AuthWrapperProps) => {
  const { isAuthenticated, role } = useAuth();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && (!isAuthenticated || !allowedRoles.includes(role || ''))) {
      router.push('/auth/unauthorized');
    }
  }, [isClient, isAuthenticated, role, router]);

  if (!isClient) {    
    return null;
  }

  return <>{children}</>;
};

export default AuthWrapper;
