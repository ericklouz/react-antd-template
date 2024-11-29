import { ApiResponse } from '@src/shared/types';

import { PasswordChangeDto } from '../dtos';
import { AuthRepository } from '../repositories';

interface PasswordChangeUseCase {
  execute(_passwordChangeDto: PasswordChangeDto): Promise<ApiResponse<null> | null>;
}

class PasswordChange implements PasswordChangeUseCase {
  private authRepository: AuthRepository;
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(passwordChangeDto: PasswordChangeDto): Promise<any> {
    return this.authRepository.passwordChange(passwordChangeDto);
  }
}

export default PasswordChange;
