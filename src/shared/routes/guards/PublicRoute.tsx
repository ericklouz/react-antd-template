import { RootState } from '@src/shared/redux/types';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

function PublicRoute() {
  const { isAuthenticated } = useSelector((state: RootState) => state.authState);
  return isAuthenticated ? <Navigate to="/" /> : <Outlet />;
}

export default PublicRoute;
