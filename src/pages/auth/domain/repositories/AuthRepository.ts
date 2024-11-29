import { UserEntity } from '@src/pages/users/domain/entities';
import { ApiResponse } from '@src/shared/types';

import { LoginDto, PasswordChangeDto } from '../dtos';

abstract class AuthRepository {
  abstract login(_loginDto: LoginDto): Promise<ApiResponse<UserEntity> | null>;
  abstract logout(): Promise<ApiResponse<any>>;
  abstract passwordReset(_email: string): Promise<ApiResponse<null>>;
  abstract passwordChange(_passwordChangeDto: PasswordChangeDto): Promise<ApiResponse<null>>;
  // register(user: User): Promise<User>;
}

export default AuthRepository;
