import { createBrowserRouter, RouteObject } from 'react-router-dom';

import { MainLayout } from '../layouts';
import { PrivateRoute } from './guards';
import { Error404Page } from '../pages/errors';

// Helper function to map the imported routes dynamically
const mapRoutes = (routes: Record<string, { default: RouteObject }>): RouteObject[] => {
  return Object.values(routes).map((route) => route.default);
};

// Dynamic import of routes with TypeScript
const authRoutes = import.meta.glob<{ default: RouteObject }>('@src/pages/auth/**/routes/*.tsx', {
  eager: true
});
const pageRoutes = import.meta.glob<{ default: RouteObject }>('@src/pages/!(auth)/**/routes/*.tsx', {
  eager: true
});

// Map imported routes
const authRoutesList = mapRoutes(authRoutes);
const pageRoutesList = mapRoutes(pageRoutes);

// Configure main routes
const routesArray: RouteObject[] = [
  ...authRoutesList,
  {
    path: '/',
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: pageRoutesList
  },
  {
    path: '*',
    element: (
      <PrivateRoute>
        <Error404Page />
      </PrivateRoute>
    )
  }
];

const appRoutes = createBrowserRouter(routesArray);

export { appRoutes };
