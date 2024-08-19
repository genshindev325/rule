import { ReactNode } from 'react';
import { useAuth } from '@/components/auth/authContext';
import { useRouter } from 'next/navigation';

interface AuthWrapperProps {
  allowedRoles: string[];
  children: ReactNode;
}

const AuthWrapper = ({ allowedRoles, children }: AuthWrapperProps) => {
  const { isAuthenticated, userRole } = useAuth();
  const router = useRouter();

  if (!isAuthenticated || !allowedRoles.includes(userRole || '')) {
    router.push('/auth/unauthorized');
    return null;
  }

  return <>{children}</>;
};

export default AuthWrapper;
