import update from 'immutability-helper';
import { Reducer } from 'redux';
import { AuthActionTypes, AuthReducerAction } from '../actions/auth.actions';

export interface AuthState {
  loggedIn: boolean;
  accessToken?: string;
  error?: Error;
}

export const authInitialState: AuthState = {
  loggedIn: false,
};

export const authReducer: Reducer<AuthState, AuthReducerAction> = (
  state = authInitialState,
  action,
) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return update(state, {
        loggedIn: { $set: true },
        accessToken: { $set: action.accessToken },
        error: { $set: undefined },
      });
    case AuthActionTypes.LOGIN_ERROR:
      return update(state, {
        loggedIn: { $set: false },
        accessToken: { $set: undefined },
        error: { $set: action.error },
      });
    default:
      return state;
  }
};
