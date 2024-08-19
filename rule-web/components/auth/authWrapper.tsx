import { ReactNode } from 'react';
import { useAuth } from '@/components/auth/authContext';
import { useRouter } from 'next/navigation';

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  if (!isAuthenticated) {
    router.push('/auth/signIn'); // Redirect to the sign-in page
    return null;
  }

  return <>{children}</>;
};

export default AuthWrapper;
