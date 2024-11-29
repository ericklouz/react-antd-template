import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authReducer } from '@src/pages/auth/infrastructure/redux';
import { persistReducer, persistStore, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import sidebarReducer from './slices/layout/sidebarSlice';
import themeReducer from './slices/theme/themeSlice';
import { RootState } from './types';

// Combine reducers
const rootReducer = combineReducers({
  themeState: themeReducer,
  sidebarState: sidebarReducer,
  authState: authReducer
});

// Persist config with RootState
const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
  whitelist: ['themeState', 'sidebarState', 'authState', 'passwordResetState']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

// Persistor
export const persistor = persistStore(store);
