import HttpClientService from './http-client.service';

export interface LoginResponse {
  accessToken: string;
}

class AuthService {
  private clientInstance = HttpClientService.getClientInstance();

  login(username: string, password: string): Promise<LoginResponse> {
    return this.clientInstance
      .post<LoginResponse>('/auth/login', {
        username,
        password,
      })
      .then((response) => {
        const accessToken = response.data.accessToken;

        localStorage.setItem('accessToken', accessToken);

        return response.data;
      });
  }
}

export default AuthService;
