import { combineReducers } from 'redux';
import { AuthReducerAction } from './actions/auth.actions';
import { authReducer } from './reducers/auth.reducer';
import { userTeamsReducer } from './reducers/user-teams.reducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  userTeams: userTeamsReducer,
});

export type StoreStateType = ReturnType<typeof rootReducer>;

export type StoreAction = AuthReducerAction;
