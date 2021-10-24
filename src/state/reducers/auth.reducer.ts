import { Reducer } from 'redux';
import { AuthenticationInfo } from '../../models/auth.models';
import { AuthActions, AuthReducerAction } from '../actions/auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
  authenticationInfo?: AuthenticationInfo;
  error?: Error;
}

export const authInitialState: AuthState = {
  isAuthenticated: false,
};

export const authReducer: Reducer<AuthState, AuthReducerAction> = (
  state = authInitialState,
  action,
): AuthState => {
  switch (action.type) {
    case AuthActions.LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        authenticationInfo: action.authenticationInfo,
        error: undefined,
      };
    case AuthActions.LOGIN_ERROR:
      return {
        isAuthenticated: false,
        authenticationInfo: undefined,
        error: action.error,
      };
    case AuthActions.LOGOUT:
      return authInitialState;
    default:
      return state;
  }
};
