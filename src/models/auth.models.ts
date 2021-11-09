export interface LoginResponse {
  accessToken: string;
}

export interface TokenContents {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
  exp: number;
  iat: number;
}

export interface AuthenticationInfo {
  loginResponse: LoginResponse;
  tokenContents: TokenContents;
}
