import { Dispatch } from 'redux';
import { TicketStatus } from '../../models/ticket.models';
import TeamService from '../../services/team.service';

export class TicketStatusActions {
  static readonly FETCH_STATUS_TRANSITIONS_SUCCESS =
    '[TicketStatus] Fetch Status Transitions Success';
  static readonly FETCH_STATUS_TRANSITIONS_LOADING =
    '[TicketStatus] Fetch Status Transitions Loading';
  static readonly FETCH_STATUS_TRANSITIONS_ERROR =
    '[TicketStatus] Fetch Status Transitions Error';

  service = new TeamService();

  fetchTicketStatusTransitions = (teamId: string) => {
    return (dispatch: Dispatch): Promise<TicketStatusReducerAction> => {
      dispatch({
        type: TicketStatusActions.FETCH_STATUS_TRANSITIONS_LOADING as typeof TicketStatusActions.FETCH_STATUS_TRANSITIONS_LOADING,
      });

      return this.service.getTicketStatusTransitionInfo(teamId).then(
        (statusInfo) => {
          return dispatch({
            type: TicketStatusActions.FETCH_STATUS_TRANSITIONS_SUCCESS as typeof TicketStatusActions.FETCH_STATUS_TRANSITIONS_SUCCESS,
            statusInfo,
          });
        },
        (error) => {
          return dispatch({
            type: TicketStatusActions.FETCH_STATUS_TRANSITIONS_ERROR as typeof TicketStatusActions.FETCH_STATUS_TRANSITIONS_ERROR,
            error,
          });
        },
      );
    };
  };
}

export type TicketStatusReducerAction =
  | FetchStatusTransitionsSuccess
  | FetchStatusTransitionsLoading
  | FetchStatusTransitionsError;

export interface FetchStatusTransitionsSuccess {
  type: typeof TicketStatusActions.FETCH_STATUS_TRANSITIONS_SUCCESS;
  statusInfo: TicketStatus[];
}

export interface FetchStatusTransitionsError {
  type: typeof TicketStatusActions.FETCH_STATUS_TRANSITIONS_ERROR;
  error: Error;
}

export interface FetchStatusTransitionsLoading {
  type: typeof TicketStatusActions.FETCH_STATUS_TRANSITIONS_LOADING;
}
