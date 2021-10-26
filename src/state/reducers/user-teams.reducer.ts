import { Reducer } from 'redux';
import { UserTeamInfo } from '../../models/team.models';
import {
  UserTeamsActions,
  UserTeamsReducerAction,
} from '../actions/user-teams.actions';

export interface UserTeamsState {
  allTeamsInfos?: UserTeamInfo[];
  allTeamsInfosError?: Error;
  currentTeamInfos?: UserTeamInfo;
  currentTeamInfosError?: Error;
  currentTeamInfosLoading: boolean;
}

export const userTeamsInitialState: UserTeamsState = {
  currentTeamInfosLoading: false,
};

export const userTeamsReducer: Reducer<UserTeamsState, UserTeamsReducerAction> =
  (state = userTeamsInitialState, action) => {
    switch (action.type) {
      case UserTeamsActions.FETCH_TEAMS_OF_USER_SUCCESS:
        return {
          ...state,
          allTeamsInfos: action.teamsInfos,
        };
      case UserTeamsActions.FETCH_TEAMS_OF_USER_ERROR:
        return {
          ...state,
          allTeamsInfosError: action.error,
        };
      case UserTeamsActions.FETCH_TEAM_DETAILS_SUCCESS:
        return {
          ...state,
          currentTeamInfos: action.teamInfos,
          currentTeamInfosLoading: false,
        };
      case UserTeamsActions.FETCH_TEAM_DETAILS_ERROR:
        return {
          ...state,
          currentTeamInfosError: action.error,
          currentTeamInfosLoading: false,
        };
      case UserTeamsActions.FETCH_TEAM_DETAILS_LOADING:
        return {
          ...state,
          currentTeamInfosLoading: true,
        };
      default:
        return { ...state };
    }
  };
