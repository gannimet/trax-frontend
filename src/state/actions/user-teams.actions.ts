import { Dispatch } from 'redux';
import { UserTeamsInfo } from '../../models/team.models';
import UserService from '../../services/user.service';

export class UserTeamsActions {
  static readonly FETCH_TEAMS_OF_USER_SUCCESS = 'FETCH_TEAMS_OF_USER_SUCCESS';
  static readonly FETCH_TEAMS_OF_USER_ERROR = 'FETCH_TEAMS_OF_USER_ERROR';

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
}

export type UserReducerAction =
  | FetchTeamsOfUserSuccessAction
  | FetchTeamsOfUserErrorAction;

export interface FetchTeamsOfUserSuccessAction {
  type: typeof UserTeamsActions.FETCH_TEAMS_OF_USER_SUCCESS;
  teamsInfos: UserTeamsInfo[];
}

export interface FetchTeamsOfUserErrorAction {
  type: typeof UserTeamsActions.FETCH_TEAMS_OF_USER_ERROR;
  error: Error;
}
