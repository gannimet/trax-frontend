import { Reducer } from 'redux';
import { Ticket } from '../../models/ticket.models';
import {
  TicketsActions,
  TicketsReducerAction,
} from '../actions/tickets.actions';

export interface TicketsState {
  ticket?: Ticket;
  ticketError?: Error;
  ticketLoading: boolean;
  postCommentLoading: boolean;
  postCommentError?: Error;
  editTicketLoading: boolean;
  editTicketError?: Error;
}

export const ticketsInitialState: TicketsState = {
  ticketLoading: false,
  postCommentLoading: false,
  editTicketLoading: false,
};

export const ticketsReducer: Reducer<TicketsState, TicketsReducerAction> = (
  state = ticketsInitialState,
  action,
) => {
  switch (action.type) {
    case TicketsActions.FETCH_TICKET_SUCCESS:
      return {
        ...state,
        ticket: action.ticket,
        ticketLoading: false,
        ticketError: undefined,
      };
    case TicketsActions.FETCH_TICKET_ERROR:
      return {
        ...state,
        ticket: undefined,
        ticketLoading: false,
        ticketError: action.error,
      };
    case TicketsActions.FETCH_TICKET_LOADING:
      return {
        ...state,
        ticket: undefined,
        ticketLoading: true,
        ticketError: undefined,
      };
    case TicketsActions.POST_TICKET_COMMENT_SUCCESS:
      return {
        ...state,
        ticket: action.ticket,
        postCommentLoading: false,
        postCommentError: undefined,
      };
    case TicketsActions.POST_TICKET_COMMENT_ERROR:
      return {
        ...state,
        postCommentLoading: false,
        postCommentError: action.error,
      };
    case TicketsActions.POST_TICKET_COMMENT_LOADING:
      return {
        ...state,
        postCommentLoading: true,
        postCommentError: undefined,
      };
    case TicketsActions.EDIT_TICKET_SUCCESS:
      return {
        ...state,
        ticket: action.ticket,
        editTicketLoading: false,
        editTicketError: undefined,
      };
    case TicketsActions.EDIT_TICKET_ERROR:
      return {
        ...state,
        editTicketLoading: false,
        editTicketError: action.error,
      };
    case TicketsActions.EDIT_TICKET_LOADING:
      return {
        ...state,
        editTicketLoading: true,
        editTicketError: undefined,
      };
    default:
      return { ...state };
  }
};
