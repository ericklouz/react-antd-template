import { PATH_AUTH } from '@src/shared/constants/routes';
import { PublicRoute } from '@src/shared/routes/guards';
import { Navigate, RouteObject } from 'react-router-dom';

import { PasswordResetPage, LoginPage, PasswordChangePage } from '../pages';

const routes: RouteObject = {
  path: 'auth',
  element: <PublicRoute />,
  children: [
    {
      path: '',
      element: <Navigate to={PATH_AUTH.login} replace />
    },
    {
      path: 'login',
      element: <LoginPage />
    },
    {
      path: 'password-reset',
      element: <PasswordResetPage />
    },
    {
      path: 'password-change',
      element: <PasswordChangePage />
    }
  ]
};

export default routes;
