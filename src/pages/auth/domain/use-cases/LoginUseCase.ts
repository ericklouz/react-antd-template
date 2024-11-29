import { UserEntity } from '@src/pages/users/domain/entities';
import { ApiResponse } from '@src/shared/types';

import { LoginDto } from '../dtos';
import { AuthRepository } from '../repositories';

interface LoginUseCase {
  execute(_loginDto: LoginDto): Promise<ApiResponse<UserEntity> | null>;
}

class Login implements LoginUseCase {
  private authRepository: AuthRepository;
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(loginDto: LoginDto): Promise<any> {
    return this.authRepository.login(loginDto);
  }
}

export default Login;
