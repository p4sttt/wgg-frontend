import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuth } from '~/hooks';

interface RequireAuthProps {
  withAuth: ReactNode;
  withoutAuth?: ReactNode;
}

const WithoutAuthByDefault = () => {
  const { pathname } = useLocation();
  return (
    <Navigate
      to='/login'
      state={{
        from: pathname,
      }}
    />
  );
};

export const RequireAuth = ({
  withAuth,
  withoutAuth = <WithoutAuthByDefault />,
}: RequireAuthProps) => {
  const { isAuth } = useAuth();

  if (isAuth) {
    return withAuth;
  } else {
    return withoutAuth;
  }
};
