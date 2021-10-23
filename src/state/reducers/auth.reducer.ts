import { Reducer } from 'redux';
import { AuthActionTypes, AuthReducerAction } from '../actions/auth.actions';

export interface AuthState {
  isAuthenticated: boolean;
  accessToken?: string;
  error?: Error;
}

export const authInitialState: AuthState = {
  isAuthenticated: false,
};

export const authReducer: Reducer<AuthState, AuthReducerAction> = (
  state = authInitialState,
  action,
) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        isAuthenticated: true,
        accessToken: action.accessToken,
        error: undefined,
      };
    case AuthActionTypes.LOGIN_ERROR:
      return {
        isAuthenticated: false,
        accessToken: undefined,
        error: action.error,
      };
    default:
      return state;
  }
};
