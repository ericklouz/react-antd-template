import { Envs } from '@src/config/index';
import { HttpClient } from '@src/shared/types';

class FetchHttpClient implements HttpClient {
  private baseURL: string;
  private accessToken: string | null = null; // Store the token in memory
  private readonly publicRoutes: string[] = ['/v1/auth/login', '/v1/auth/password-reset', '/v1/auth/password-change']; // Define public routes

  constructor(baseURL: string = Envs.apiUrl) {
    this.baseURL = baseURL;
  }

  private async request<T>(url: string, options: RequestInit, retry: boolean = true): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      Authorization: this.accessToken && !this.isPublicRoute(url) ? `Bearer ${this.accessToken}` : '',
      ...options.headers
    };

    const response = await fetch(`${this.baseURL}${url}`, {
      ...options,
      headers,
      credentials: 'include' // Important for sending cookies
    });

    if (!response.ok) {
      await this.handleError(response, url, options, retry);
    }

    return (await response.json()) as T;
  }

  private isPublicRoute(url: string): boolean {
    return this.publicRoutes.some((route) => url.startsWith(route));
  }

  private async handleError(response: Response, url: string, options: RequestInit, retry: boolean) {
    const errorText = await response.text();
    const { error } = JSON.parse(errorText || '{}');

    // Only attempt to refresh the token if the request is not to a public route
    if (response.status === 401 && retry && !this.isPublicRoute(url)) {
      await this.refreshToken(); // Attempt to refresh the token
      return this.request(url, options, false); // Retry the original request with the new token
    }

    const errorMessage = error?.message || errorText || 'Something went wrong';
    throw new Error(errorMessage);
  }

  async get<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>(url, { method: 'GET', ...config });
  }

  async post<T>(url: string, body: any, config?: RequestInit): Promise<T> {
    return this.request<T>(url, { method: 'POST', body: JSON.stringify(body), ...config });
  }

  async put<T>(url: string, body: any, config?: RequestInit): Promise<T> {
    return this.request<T>(url, { method: 'PUT', body: JSON.stringify(body), ...config });
  }

  async delete<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>(url, { method: 'DELETE', ...config });
  }

  private async refreshToken() {
    const response = await fetch(`${this.baseURL}/v1/auth/refresh`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include' // Important for sending cookies
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const { accessToken } = await response.json();
    this.accessToken = accessToken; // Update the access token in memory
  }

  public setAccessToken(token: string) {
    this.accessToken = token; // Allows setting the initial token after login
  }
}

export default FetchHttpClient;
