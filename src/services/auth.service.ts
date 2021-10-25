import jwtDecode from 'jwt-decode';
import { StorageItem } from '../constants/storage';
import {
  AuthenticationInfo,
  LoginResponse,
  TokenContents,
} from '../models/auth.models';
import HttpClientService from './http-client.service';

class AuthService extends HttpClientService {
  static setupLogoutInterceptor(onLogout: () => void): void {
    AuthService.getClientInstance().interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        const errorStatus: number = error.status || error.response.status;

        if ([401, 403].includes(errorStatus)) {
          // Token invalid or expired, force logout
          onLogout();
        }
      },
    );
  }

  login(username: string, password: string): Promise<AuthenticationInfo> {
    return AuthService.getClientInstance()
      .post<LoginResponse>('/auth/login', {
        username,
        password,
      })
      .then((response) => {
        const accessToken = response.data.accessToken;
        const tokenContents = jwtDecode(accessToken) as TokenContents;

        localStorage.setItem(StorageItem.AccessToken, accessToken);
        localStorage.setItem(
          StorageItem.TokenContents,
          JSON.stringify(tokenContents),
        );

        return {
          loginResponse: response.data,
          tokenContents,
        };
      });
  }

  logout(): void {
    localStorage.removeItem(StorageItem.AccessToken);
    localStorage.removeItem(StorageItem.TokenContents);
  }
}

export default AuthService;
