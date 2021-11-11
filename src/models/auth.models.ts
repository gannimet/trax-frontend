export interface LoginResponse {
  accessToken: string;
}

export interface AuthIdentity {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface TokenContents extends AuthIdentity {
  exp: number;
  iat: number;
}

export interface AuthenticationInfo {
  loginResponse: LoginResponse;
  tokenContents: TokenContents;
}
