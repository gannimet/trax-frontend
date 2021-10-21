import { Dispatch } from 'redux';
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
  accessToken: string;
}

export interface LoginErrorAction {
  type: typeof AuthActionTypes.LOGIN_ERROR;
  error: Error;
}

const authService = new AuthService();

// login: ActionCreator<
// ThunkAction<
//   Promise<LoginSuccessAction | LoginErrorAction>,
//   StoreStateType,
//   unknown,
//   LoginSuccessAction | LoginErrorAction
// >
// >
export const login = (username: string, password: string) => {
  return (dispatch: Dispatch): Promise<LoginSuccessAction> => {
    return authService.login(username, password).then((response) => {
      return dispatch({
        type: AuthActionTypes.LOGIN_SUCCESS,
        accessToken: response.accessToken,
      } as LoginSuccessAction);
    });
  };
};
