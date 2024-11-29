import { AuthDatasource } from '@src/pages/auth/domain/datasources';
import { LoginDto, PasswordChangeDto } from '@src/pages/auth/domain/dtos';
import { AuthRepository } from '@src/pages/auth/domain/repositories';
import { UserEntity } from '@src/pages/users/domain/entities';
import { ApiResponse } from '@src/shared/types';

class AuthRepositoryImpl implements AuthRepository {
  private readonly authDatasource: AuthDatasource;
  constructor(authDatasource: AuthDatasource) {
    this.authDatasource = authDatasource;
  }

  login(loginDto: LoginDto): Promise<ApiResponse<UserEntity> | null> {
    return this.authDatasource.login(loginDto);
  }

  logout(): Promise<ApiResponse<any>> {
    return this.authDatasource.logout();
  }

  passwordReset(email: string): Promise<ApiResponse<null>> {
    return this.authDatasource.passwordReset(email);
  }

  passwordChange(passwordChangeDto: PasswordChangeDto): Promise<ApiResponse<null>> {
    return this.authDatasource.passwordChange(passwordChangeDto);
  }
}

export default AuthRepositoryImpl;
