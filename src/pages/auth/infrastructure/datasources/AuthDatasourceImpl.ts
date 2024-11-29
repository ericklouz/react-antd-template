import { AuthDatasource } from '@src/pages/auth/domain/datasources';
import { LoginDto, PasswordChangeDto } from '@src/pages/auth/domain/dtos';
import { UserEntity } from '@src/pages/users/domain/entities';
import { FetchHttpClient } from '@src/shared/adapters/http';
import { ApiResponse, HttpClient } from '@src/shared/types';

class AuthDatasourceImpl implements AuthDatasource {
  private readonly httpClient: HttpClient;

  constructor(httpClient: HttpClient = new FetchHttpClient()) {
    this.httpClient = httpClient;
  }

  async login(loginDto: LoginDto): Promise<ApiResponse<UserEntity> | null> {
    // Hacer la solicitud de login (esto almacenará el refresh token en las cookies)
    const response: ApiResponse<UserEntity> = await this.httpClient.post('/v1/auth/login', loginDto);

    // Después del login, obtener el accessToken usando el refresh token almacenado en las cookies
    const { data }: ApiResponse<{ accessToken: string }> = await this.httpClient.get('/v1/auth/refresh', {});

    // Almacenar el accessToken en memoria
    this.httpClient.setAccessToken(data?.accessToken as string);

    return response;
  }

  async logout(): Promise<ApiResponse<any>> {
    const response: ApiResponse<any> = await this.httpClient.get('/v1/auth/logout');
    return response;
  }

  async passwordReset(email: string): Promise<ApiResponse<null>> {
    const response: ApiResponse<any> = await this.httpClient.post('/v1/auth/password-reset', { email });
    return response;
  }

  async passwordChange(passwordChangeDto: PasswordChangeDto): Promise<ApiResponse<null>> {
    const response: ApiResponse<any> = await this.httpClient.post('/v1/auth/password-change', passwordChangeDto);

    // Después del login, obtener el accessToken usando el refresh token almacenado en las cookies
    const { data }: ApiResponse<{ accessToken: string }> = await this.httpClient.get('/v1/auth/refresh', {});

    // Almacenar el accessToken en memoria
    this.httpClient.setAccessToken(data?.accessToken as string);

    return response;
  }
}

export default AuthDatasourceImpl;
