import { Dispatch } from 'redux';
import { UserTeamInfo } from '../../models/team.models';
import UserService from '../../services/user.service';

export class UserTeamsActions {
  static readonly FETCH_TEAMS_OF_USER_SUCCESS = 'FETCH_TEAMS_OF_USER_SUCCESS';
  static readonly FETCH_TEAMS_OF_USER_ERROR = 'FETCH_TEAMS_OF_USER_ERROR';
  static readonly FETCH_TEAM_DETAILS_SUCCESS = 'FETCH_TEAM_DETAILS_SUCCESS';
  static readonly FETCH_TEAM_DETAILS_ERROR = 'FETCH_TEAM_DETAILS_ERROR';
  static readonly FETCH_TEAM_DETAILS_LOADING = 'FETCH_TEAM_DETAILS_LOADING';

  userService = new UserService();

  fetchTeamsOfUser = (userId: string) => {
    return (
      dispatch: Dispatch,
    ): Promise<FetchTeamsOfUserSuccessAction | FetchTeamsOfUserErrorAction> => {
      return this.userService.getTeamsForUser(userId).then(
        (teamsInfos) => {
          return dispatch({
            type: UserTeamsActions.FETCH_TEAMS_OF_USER_SUCCESS as typeof UserTeamsActions.FETCH_TEAMS_OF_USER_SUCCESS,
            teamsInfos,
          });
        },
        (error) => {
          return dispatch({
            type: UserTeamsActions.FETCH_TEAMS_OF_USER_ERROR as typeof UserTeamsActions.FETCH_TEAMS_OF_USER_ERROR,
            error,
          });
        },
      );
    };
  };

  fetchTeamDetailsOfUser = (userId: string, teamId: string) => {
    return (
      dispatch: Dispatch,
    ): Promise<FetchTeamDetailsSuccessAction | FetchTeamDetailsErrorAction> => {
      dispatch({
        type: UserTeamsActions.FETCH_TEAM_DETAILS_LOADING as typeof UserTeamsActions.FETCH_TEAM_DETAILS_LOADING,
      });

      return this.userService.getTeamDetailsForUser(userId, teamId).then(
        (teamInfos) => {
          return dispatch({
            type: UserTeamsActions.FETCH_TEAM_DETAILS_SUCCESS as typeof UserTeamsActions.FETCH_TEAM_DETAILS_SUCCESS,
            teamInfos,
          });
        },
        (error) => {
          return dispatch({
            type: UserTeamsActions.FETCH_TEAM_DETAILS_ERROR as typeof UserTeamsActions.FETCH_TEAM_DETAILS_ERROR,
            error,
          });
        },
      );
    };
  };
}

export type UserTeamsReducerAction =
  | FetchTeamsOfUserSuccessAction
  | FetchTeamsOfUserErrorAction
  | FetchTeamDetailsSuccessAction
  | FetchTeamDetailsErrorAction
  | FetchTeamDetailsLoadingAction;

export interface FetchTeamsOfUserSuccessAction {
  type: typeof UserTeamsActions.FETCH_TEAMS_OF_USER_SUCCESS;
  teamsInfos: UserTeamInfo[];
}

export interface FetchTeamsOfUserErrorAction {
  type: typeof UserTeamsActions.FETCH_TEAMS_OF_USER_ERROR;
  error: Error;
}

export interface FetchTeamDetailsSuccessAction {
  type: typeof UserTeamsActions.FETCH_TEAM_DETAILS_SUCCESS;
  teamInfos: UserTeamInfo;
}

export interface FetchTeamDetailsErrorAction {
  type: typeof UserTeamsActions.FETCH_TEAM_DETAILS_ERROR;
  error: Error;
}

export interface FetchTeamDetailsLoadingAction {
  type: typeof UserTeamsActions.FETCH_TEAM_DETAILS_LOADING;
}
