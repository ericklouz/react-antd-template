import { UserEntity } from '@src/pages/users/domain/entities';

import SliceState from './SliceState';

interface AuthState extends SliceState {
  lastPasswordResetRequest: number | null;
  passwordChangeRequestAvailable: boolean;
  isAuthenticated: boolean;
  user: Pick<UserEntity, 'names' | 'paternal_surname' | 'maternal_surname' | 'email'> | null;
}

export default AuthState;
