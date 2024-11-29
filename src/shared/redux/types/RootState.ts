import { AuthState } from '@src/pages/auth/types';
import { PersistPartial } from 'redux-persist/es/persistReducer';

import SidebarState from './SidebarState';
import ThemeState from './ThemeState';
import { store } from '../store';

// Define the state shape
export interface RootState {
  themeState: ThemeState;
  sidebarState: SidebarState;
  authState: AuthState & PersistPartial;
}

export type AppDispatch = typeof store.dispatch;
