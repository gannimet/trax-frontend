import { Reducer } from 'redux';
import { UserTeamsInfo } from '../../models/team.models';
import {
  UserReducerAction,
  UserTeamsActions,
} from '../actions/user-teams.actions';

export interface UserTeamsState {
  teamsInfos?: UserTeamsInfo[];
  error?: Error;
}

export const userTeamsInitialState: UserTeamsState = {};

export const userTeamsReducer: Reducer<UserTeamsState, UserReducerAction> = (
  state = userTeamsInitialState,
  action,
) => {
  switch (action.type) {
    case UserTeamsActions.FETCH_TEAMS_OF_USER_SUCCESS:
      return {
        teamsInfos: action.teamsInfos,
      };
    case UserTeamsActions.FETCH_TEAMS_OF_USER_ERROR:
      return {
        error: action.error,
      };
    default:
      return state;
  }
};
