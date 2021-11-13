import { Dispatch } from 'redux';
import { User, UserTeamInfo } from '../../models/user.models';
import TeamService from '../../services/team.service';

export class UserTeamsActions {
  static readonly FETCH_TEAMS_OF_USER_SUCCESS = 'FETCH_TEAMS_OF_USER_SUCCESS';
  static readonly FETCH_TEAMS_OF_USER_ERROR = 'FETCH_TEAMS_OF_USER_ERROR';

  static readonly FETCH_TEAM_DETAILS_SUCCESS = 'FETCH_TEAM_DETAILS_SUCCESS';
  static readonly FETCH_TEAM_DETAILS_ERROR = 'FETCH_TEAM_DETAILS_ERROR';
  static readonly FETCH_TEAM_DETAILS_LOADING = 'FETCH_TEAM_DETAILS_LOADING';

  static readonly FETCH_USERS_OF_TEAM_SUCCESS = 'FETCH_USERS_OF_TEAM_SUCCESS';
  static readonly FETCH_USERS_OF_TEAM_ERROR = 'FETCH_USERS_OF_TEAM_ERROR';
  static readonly FETCH_USERS_OF_TEAM_LOADING = 'FETCH_USERS_OF_TEAM_LOADING';

  teamService = new TeamService();

  fetchTeamsOfUser = () => {
    return (dispatch: Dispatch): Promise<TeamsOfUserAction> => {
      return this.teamService.getTeamsForUser().then(
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

  fetchTeamDetailsOfUser = (teamId: string) => {
    return (dispatch: Dispatch): Promise<TeamDetailsAction> => {
      dispatch({
        type: UserTeamsActions.FETCH_TEAM_DETAILS_LOADING as typeof UserTeamsActions.FETCH_TEAM_DETAILS_LOADING,
      });

      return this.teamService.getTeamDetailsForUser(teamId).then(
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

  fetchUsersOfTeam = (teamId: string, search: string) => {
    return (dispatch: Dispatch): Promise<UsersOfTeamAction> => {
      dispatch({
        type: UserTeamsActions.FETCH_USERS_OF_TEAM_LOADING as typeof UserTeamsActions.FETCH_USERS_OF_TEAM_LOADING,
      });

      return this.teamService.getUsersOfTeam(teamId, search).then(
        (users) => {
          return dispatch({
            type: UserTeamsActions.FETCH_USERS_OF_TEAM_SUCCESS as typeof UserTeamsActions.FETCH_USERS_OF_TEAM_SUCCESS,
            users,
          });
        },
        (error) => {
          return dispatch({
            type: UserTeamsActions.FETCH_USERS_OF_TEAM_ERROR as typeof UserTeamsActions.FETCH_USERS_OF_TEAM_ERROR,
            error,
          });
        },
      );
    };
  };
}

export type UserTeamsReducerAction =
  | TeamsOfUserAction
  | TeamDetailsAction
  | UsersOfTeamAction;

export type TeamsOfUserAction =
  | FetchTeamsOfUserSuccessAction
  | FetchTeamsOfUserErrorAction;

export type TeamDetailsAction =
  | FetchTeamDetailsSuccessAction
  | FetchTeamDetailsErrorAction
  | FetchTeamDetailsLoadingAction;

export type UsersOfTeamAction =
  | FetchUsersOfTeamSuccessAction
  | FetchUsersOfTeamErrorAction
  | FetchUsersOfTeamLoadingAction;

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

export interface FetchUsersOfTeamSuccessAction {
  type: typeof UserTeamsActions.FETCH_USERS_OF_TEAM_SUCCESS;
  users: User[];
}

export interface FetchUsersOfTeamErrorAction {
  type: typeof UserTeamsActions.FETCH_USERS_OF_TEAM_ERROR;
  error: Error;
}

export interface FetchUsersOfTeamLoadingAction {
  type: typeof UserTeamsActions.FETCH_USERS_OF_TEAM_LOADING;
}
