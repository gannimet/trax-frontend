import { Dispatch } from 'redux';
import { AuthenticationInfo } from '../../models/auth.models';
import AuthService from '../../services/auth.service';

export class AuthActions {
  static readonly LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  static readonly LOGIN_ERROR = 'LOGIN_ERROR';
  static readonly LOGOUT = 'LOGOUT';

  authService = new AuthService();

  login = (username: string, password: string) => {
    return (
      dispatch: Dispatch,
    ): Promise<LoginSuccessAction | LoginErrorAction> => {
      return this.authService.login(username, password).then(
        (authenticationInfo) => {
          return dispatch({
            type: AuthActions.LOGIN_SUCCESS as typeof AuthActions.LOGIN_SUCCESS,
            authenticationInfo,
          });
        },
        (error) => {
          return dispatch({
            type: AuthActions.LOGIN_ERROR as typeof AuthActions.LOGIN_ERROR,
            error,
          });
        },
      );
    };
  };

  logout = () => {
    return (dispatch: Dispatch): LogoutAction => {
      this.authService.logout();

      return dispatch({
        type: AuthActions.LOGOUT,
      });
    };
  };
}

export type AuthReducerAction =
  | LoginSuccessAction
  | LoginErrorAction
  | LogoutAction;

export interface LoginSuccessAction {
  type: typeof AuthActions.LOGIN_SUCCESS;
  authenticationInfo: AuthenticationInfo;
}

export interface LoginErrorAction {
  type: typeof AuthActions.LOGIN_ERROR;
  error: Error;
}

export interface LogoutAction {
  type: typeof AuthActions.LOGOUT;
}
