import { Dispatch } from 'redux';
import { AuthenticationInfo } from '../../models/auth.models';
import AuthService from '../../services/auth.service';

export class AuthActionTypes {
  static readonly LOGIN = 'LOGIN';
  static readonly LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  static readonly LOGIN_ERROR = 'LOGIN_ERROR';
}

export type AuthReducerAction =
  | LoginAction
  | LoginSuccessAction
  | LoginErrorAction;

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

const authService = new AuthService();

export const login = (username: string, password: string) => {
  return (dispatch: Dispatch): Promise<LoginSuccessAction> => {
    return authService.login(username, password).then((authenticationInfo) => {
      return dispatch({
        type: AuthActionTypes.LOGIN_SUCCESS,
        authenticationInfo,
      } as LoginSuccessAction);
    });
  };
};
