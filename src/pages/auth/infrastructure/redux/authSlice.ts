import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthState } from '@src/pages/auth/types';
import { ErrorHandler } from '@src/shared/utils';
import { PersistConfig, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { LoginDto, PasswordChangeDto } from '../../domain/dtos';
import { Login, Logout, PasswordChange, PasswordReset } from '../../domain/use-cases';
import { AuthDatasourceImpl } from '../datasources';
import { AuthRepositoryImpl } from '../repositories';

const authDatasourceImpl = new AuthDatasourceImpl();
const authRepositoryImpl = new AuthRepositoryImpl(authDatasourceImpl);

const initialState: AuthState = {
  lastPasswordResetRequest: null,
  passwordChangeRequestAvailable: false,
  isAuthenticated: false,
  user: {
    names: '',
    paternal_surname: '',
    maternal_surname: '',
    email: ''
  },
  loading: false,
  error: null,
  message: null,
  status: null
};

export const login = createAsyncThunk('auth/login', async (fields: LoginDto, { rejectWithValue }) => {
  try {
    const result = await new Login(authRepositoryImpl).execute(fields);
    return result;
  } catch (error) {
    return rejectWithValue(ErrorHandler.validate(error));
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const result = await new Logout(authRepositoryImpl).execute();
    return result;
  } catch (error) {
    return rejectWithValue(ErrorHandler.validate(error));
  }
});

export const passwordReset = createAsyncThunk('auth/passwordReset', async (email: string, { rejectWithValue }) => {
  try {
    const result = await new PasswordReset(authRepositoryImpl).execute(email);
    return result;
  } catch (error) {
    return rejectWithValue(ErrorHandler.validate(error));
  }
});

export const passwordChange = createAsyncThunk(
  'auth/passwordChange',
  async (fields: PasswordChangeDto, { rejectWithValue }) => {
    try {
      const result = await new PasswordChange(authRepositoryImpl).execute(fields);
      return result;
    } catch (error) {
      return rejectWithValue(ErrorHandler.validate(error));
    }
  }
);

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setState: (state, action: { payload: Partial<AuthState> }) => {
      const updates = action.payload; // Extraemos las actualizaciones
      for (const key in updates) {
        if (Object.prototype.hasOwnProperty.call(updates, key)) {
          const typedKey = key as keyof AuthState; // Confirmamos que es una clave válida
          const updateValue = updates[typedKey]; // Extraemos el valor
          if (updateValue !== undefined) {
            // Usamos una asignación explícita para evitar conflictos de tipo
            (state[typedKey] as typeof updateValue) = updateValue;
          }
        }
      }
    },
    resetState: (state) => {
      Object.assign(state, initialState); // Restablece el estado al inicial
    }
  },
  extraReducers: (builder) => {
    builder
      //login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.status = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
        state.status = action.payload.status;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
        state.message = null;
        state.status = null;
      })

      //logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.status = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
        state.status = action.payload.status;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
        state.message = null;
        state.status = null;
      })

      //passwordReset
      .addCase(passwordReset.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.status = null;
      })
      .addCase(passwordReset.fulfilled, (state, action) => {
        state.lastPasswordResetRequest = Date.now();
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
        state.status = action.payload.status;
      })
      .addCase(passwordReset.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
        state.message = null;
        state.status = null;
      })

      //passwordChange
      .addCase(passwordChange.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.status = null;
      })
      .addCase(passwordChange.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
        state.loading = false;
        state.error = null;
        state.message = action.payload.message;
        state.status = action.payload.status;
      })
      .addCase(passwordChange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string | null;
        state.message = null;
        state.status = null;
      });
  }
});

// Configuración persistente específica para authState
const authPersistConfig: PersistConfig<any> = {
  key: 'auth',
  storage,
  whitelist: ['isAuthenticated', 'user', 'lastPasswordResetRequest'] // Solo persistir estos campos
};

export const { setState, resetState } = authSlice.actions;
export default persistReducer(authPersistConfig, authSlice.reducer);
