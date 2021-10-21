import { combineReducers } from 'redux';
import { AuthReducerAction } from './actions/auth.actions';
import { authReducer } from './reducers/auth.reducer';

export const rootReducer = combineReducers({
  auth: authReducer,
});

export type StoreStateType = ReturnType<typeof rootReducer>;

export type StoreAction = AuthReducerAction;
