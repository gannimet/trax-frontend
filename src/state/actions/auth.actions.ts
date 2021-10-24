import { Dispatch } from 'redux';
import { AuthenticationInfo } from '../../models/auth.models';
import AuthService from '../../services/auth.service';

export class AuthActionTypes {
  static readonly LOGIN = 'LOGIN';
  static readonly LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  static readonly LOGIN_ERROR = 'LOGIN_ERROR';
  static readonly LOGOUT = 'LOGOUT';
}

export type AuthReducerAction =
  | LoginAction
  | LoginSuccessAction
  | LoginErrorAction
  | LogoutAction;

export interface LoginAction {
  type: typeof AuthActionTypes.LOGIN;
  username: string;
  password: string;
}

export interface LoginSuccessAction {
  type: typeof AuthActionTypes.LOGIN_SUCCESS;
  authenticationInfo: AuthenticationInfo;
}

export interface LoginErrorAction {
  type: typeof AuthActionTypes.LOGIN_ERROR;
  error: Error;
}

export interface LogoutAction {
  type: typeof AuthActionTypes.LOGOUT;
}

const authService = new AuthService();

export const login = (username: string, password: string) => {
  return (dispatch: Dispatch): Promise<LoginSuccessAction> => {
    return authService.login(username, password).then((authenticationInfo) => {
      return dispatch({
        type: AuthActionTypes.LOGIN_SUCCESS as typeof AuthActionTypes.LOGIN_SUCCESS,
        authenticationInfo,
      });
    });
  };
};

export const logout = () => {
  return (dispatch: Dispatch): LogoutAction => {
    authService.logout();

    return dispatch({
      type: AuthActionTypes.LOGOUT,
    });
  };
};
