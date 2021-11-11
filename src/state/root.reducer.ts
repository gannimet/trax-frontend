import { combineReducers } from 'redux';
import { AuthReducerAction } from './actions/auth.actions';
import { authReducer } from './reducers/auth.reducer';
import { ticketStatusInfoReducer } from './reducers/ticket-status.reducer';
import { ticketsReducer } from './reducers/tickets.reducer';
import { userTeamsReducer } from './reducers/user-teams.reducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  userTeams: userTeamsReducer,
  tickets: ticketsReducer,
  ticketStatusInfo: ticketStatusInfoReducer,
});

export type StoreStateType = ReturnType<typeof rootReducer>;

export type StoreAction = AuthReducerAction;
