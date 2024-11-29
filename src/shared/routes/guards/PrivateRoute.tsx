import { PATH_AUTH } from '@src/shared/constants/routes';
import { RootState } from '@src/shared/redux/types';
import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useSelector((state: RootState) => state.authState);
  if (!isAuthenticated) return <Navigate to={PATH_AUTH.login} replace />;

  return children;
}

export default PrivateRoute;
