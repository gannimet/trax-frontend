import { Dispatch } from 'redux';
import { Ticket } from '../../models/ticket.models';
import TicketService from '../../services/ticket.service';

export class TicketsActions {
  static readonly FETCH_TICKET_SUCCESS = 'FETCH_TICKET_SUCCESS';
  static readonly FETCH_TICKET_ERROR = 'FETCH_TICKET_ERROR';
  static readonly FETCH_TICKET_LOADING = 'FETCH_TICKET_LOADING';
  static readonly POST_TICKET_COMMENT_SUCCESS = 'POST_TICKET_COMMENT_SUCCESS';
  static readonly POST_TICKET_COMMENT_ERROR = 'POST_TICKET_COMMENT_ERROR';
  static readonly POST_TICKET_COMMENT_LOADING = 'POST_TICKET_COMMENT_LOADING';

  service = new TicketService();

  fetchTicketByIssueNumber = (issueNumber: string) => {
    return (
      dispatch: Dispatch,
    ): Promise<
      | FetchTicketSuccessAction
      | FetchTicketErrorAction
      | FetchTicketLoadingAction
    > => {
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

  postTicketComment = (ticketId: string, text: string) => {
    return (
      dispatch: Dispatch,
    ): Promise<
      | PostTicketCommentSuccessAction
      | PostTicketCommentErrorAction
      | PostTicketCommentLoadingAction
    > => {
      dispatch({
        type: TicketsActions.POST_TICKET_COMMENT_LOADING as typeof TicketsActions.POST_TICKET_COMMENT_LOADING,
      });

      return this.service.addTicketComment(ticketId, text).then(
        (ticket) => {
          return dispatch({
            type: TicketsActions.POST_TICKET_COMMENT_SUCCESS as typeof TicketsActions.POST_TICKET_COMMENT_SUCCESS,
            ticket,
          });
        },
        (error) => {
          return dispatch({
            type: TicketsActions.POST_TICKET_COMMENT_ERROR as typeof TicketsActions.POST_TICKET_COMMENT_ERROR,
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
  | FetchTicketLoadingAction
  | PostTicketCommentSuccessAction
  | PostTicketCommentErrorAction
  | PostTicketCommentLoadingAction;

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

export interface PostTicketCommentSuccessAction {
  type: typeof TicketsActions.POST_TICKET_COMMENT_SUCCESS;
  ticket: Ticket;
}

export interface PostTicketCommentErrorAction {
  type: typeof TicketsActions.POST_TICKET_COMMENT_ERROR;
  error: Error;
}

export interface PostTicketCommentLoadingAction {
  type: typeof TicketsActions.POST_TICKET_COMMENT_LOADING;
}
