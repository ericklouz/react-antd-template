import { ApiResponse } from '@src/shared/types';

import { AuthRepository } from '../repositories';

interface PasswordResetUseCase {
  execute(_email: string): Promise<ApiResponse<null> | null>;
}

class PasswordReset implements PasswordResetUseCase {
  private authRepository: AuthRepository;
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(email: string): Promise<any> {
    return this.authRepository.passwordReset(email);
  }
}

export default PasswordReset;
