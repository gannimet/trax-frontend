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
}

export const ticketsInitialState: TicketsState = {
  ticketLoading: false,
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
    default:
      return { ...state };
  }
};
