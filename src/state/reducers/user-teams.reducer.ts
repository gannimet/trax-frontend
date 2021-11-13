import { Reducer } from 'redux';
import { User, UserTeamInfo } from '../../models/user.models';
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
  teamUsers?: User[];
  teamUsersError?: Error;
  teamUsersLoading: boolean;
}

export const userTeamsInitialState: UserTeamsState = {
  currentTeamInfosLoading: false,
  teamUsersLoading: false,
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
          currentTeamInfosError: undefined,
        };
      case UserTeamsActions.FETCH_TEAM_DETAILS_ERROR:
        return {
          ...state,
          currentTeamInfos: undefined,
          currentTeamInfosLoading: false,
          currentTeamInfosError: action.error,
        };
      case UserTeamsActions.FETCH_TEAM_DETAILS_LOADING:
        return {
          ...state,
          currentTeamInfos: undefined,
          currentTeamInfosLoading: true,
          currentTeamInfosError: undefined,
        };
      case UserTeamsActions.FETCH_USERS_OF_TEAM_SUCCESS:
        return {
          ...state,
          teamUsers: action.users,
          teamUsersLoading: false,
          teamUsersError: undefined,
        };
      case UserTeamsActions.FETCH_USERS_OF_TEAM_ERROR:
        return {
          ...state,
          teamUsers: undefined,
          teamUsersLoading: false,
          teamUsersError: action.error,
        };
      case UserTeamsActions.FETCH_USERS_OF_TEAM_LOADING:
        return {
          ...state,
          teamUsers: undefined,
          teamUsersLoading: true,
          teamUsersError: undefined,
        };
      default:
        return { ...state };
    }
  };
