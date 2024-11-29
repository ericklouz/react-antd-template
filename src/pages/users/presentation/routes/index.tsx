import { PATH_USERS } from '@src/shared/constants/routes/routes';
import { Navigate, RouteObject } from 'react-router-dom';

import { ProfilePage } from '../pages';

const routes: RouteObject = {
  path: 'users',
  children: [
    {
      path: '',
      element: <Navigate to={PATH_USERS.root} replace />
    },
    {
      path: 'user-profile',
      element: <ProfilePage />
    }
  ]
};

export default routes;
