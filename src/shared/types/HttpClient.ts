interface HttpClient {
  get<T>(_url: string, _config?: RequestInit): Promise<T>;
  post<T>(_url: string, _body: any, _config?: RequestInit): Promise<T>;
  put<T>(_url: string, _body: any, _config?: RequestInit): Promise<T>;
  delete<T>(_url: string, _config?: RequestInit): Promise<T>;
  setAccessToken(_token: string): void;
}

export default HttpClient;
