import { combineReducers } from 'redux';
import { AuthReducerAction } from './actions/auth.actions';
import { authReducer } from './reducers/auth.reducer';
import { ticketStatusInfoReducer } from './reducers/ticket-status.reducer';
import { ticketTypesReducer } from './reducers/ticket-type.reducer';
import { ticketsReducer } from './reducers/tickets.reducer';
import { userTeamsReducer } from './reducers/user-teams.reducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  userTeams: userTeamsReducer,
  tickets: ticketsReducer,
  ticketStatusInfo: ticketStatusInfoReducer,
  ticketTypes: ticketTypesReducer,
});

export type StoreStateType = ReturnType<typeof rootReducer>;

export type StoreAction = AuthReducerAction;

export type StateEqualityFn<S> = (prev: S, next: S) => boolean;
