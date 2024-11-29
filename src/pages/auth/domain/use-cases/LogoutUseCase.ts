import { ApiResponse } from '@src/shared/types';

import { AuthRepository } from '../repositories';

interface LogoutUseCase {
  execute(): Promise<ApiResponse<any>>;
}

class Logout implements LogoutUseCase {
  private authRepository: AuthRepository;
  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  async execute(): Promise<any> {
    return this.authRepository.logout();
  }
}

export default Logout;
