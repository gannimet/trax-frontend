import { Reducer } from 'redux';
import { AuthenticationInfo } from '../../models/auth.models';
import { AuthActionTypes, AuthReducerAction } from '../actions/auth.actions';

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
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        authenticationInfo: action.authenticationInfo,
        error: undefined,
      };
    case AuthActionTypes.LOGIN_ERROR:
      return {
        isAuthenticated: false,
        authenticationInfo: undefined,
        error: action.error,
      };
    default:
      return state;
  }
};
