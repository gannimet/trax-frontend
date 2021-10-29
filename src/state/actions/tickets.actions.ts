import { Dispatch } from 'redux';
import { Ticket } from '../../models/ticket.models';
import TicketService from '../../services/ticket.service';

export class TicketsActions {
  static readonly FETCH_TICKET_SUCCESS = 'FETCH_TICKET_SUCCESS';
  static readonly FETCH_TICKET_ERROR = 'FETCH_TICKET_ERROR';
  static readonly FETCH_TICKET_LOADING = 'FETCH_TICKET_LOADING';

  service = new TicketService();

  fetchTicketByIssueNumber = (issueNumber: string) => {
    return (
      dispatch: Dispatch,
    ): Promise<FetchTicketSuccessAction | FetchTicketErrorAction> => {
      dispatch({
        type: TicketsActions.FETCH_TICKET_LOADING as typeof TicketsActions.FETCH_TICKET_LOADING,
      });

      return this.service.getTicketByIssueNumber(issueNumber).then(
        (ticket) => {
          return dispatch({
            type: TicketsActions.FETCH_TICKET_SUCCESS as typeof TicketsActions.FETCH_TICKET_SUCCESS,
            ticket,
          });
        },
        (error) => {
          return dispatch({
            type: TicketsActions.FETCH_TICKET_ERROR as typeof TicketsActions.FETCH_TICKET_ERROR,
            error,
          });
        },
      );
    };
  };
}

export type TicketsReducerAction =
  | FetchTicketSuccessAction
  | FetchTicketErrorAction
  | FetchTicketLoadingAction;

export interface FetchTicketSuccessAction {
  type: typeof TicketsActions.FETCH_TICKET_SUCCESS;
  ticket: Ticket;
}

export interface FetchTicketErrorAction {
  type: typeof TicketsActions.FETCH_TICKET_ERROR;
  error: Error;
}

export interface FetchTicketLoadingAction {
  type: typeof TicketsActions.FETCH_TICKET_LOADING;
}
