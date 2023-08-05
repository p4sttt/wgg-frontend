import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '~/hooks';

interface RequireAuthProps {
  withAuth: ReactNode;
  withoutAuth?: ReactNode;
}

export const RequireAuth = ({ withAuth, withoutAuth = <Navigate to='/login' /> }: RequireAuthProps) => {
  const { isAuth } = useAuth();

  if (isAuth) {
    return withAuth;
  } else {
    return withoutAuth;
  }
};
