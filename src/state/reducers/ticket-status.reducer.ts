import { Reducer } from 'redux';
import { TicketStatus } from '../../models/ticket.models';
import {
  TicketStatusActions,
  TicketStatusReducerAction,
} from '../actions/ticket-status.actions';

export interface TicketStatusInfoState {
  ticketStatusInfo?: TicketStatus[];
  ticketStatusError?: Error;
  ticketStatusLoading: boolean;
}

export const ticketStatusInfoInitialState: TicketStatusInfoState = {
  ticketStatusLoading: false,
};

export const ticketStatusInfoReducer: Reducer<
  TicketStatusInfoState,
  TicketStatusReducerAction
> = (state = ticketStatusInfoInitialState, action) => {
  switch (action.type) {
    case TicketStatusActions.FETCH_STATUS_TRANSITIONS_SUCCESS:
      return {
        ...state,
        ticketStatusInfo: action.statusInfo,
        ticketStatusError: undefined,
        ticketStatusLoading: false,
      };
    case TicketStatusActions.FETCH_STATUS_TRANSITIONS_ERROR:
      return {
        ...state,
        ticketStatusInfo: undefined,
        ticketStatusError: action.error,
        ticketStatusLoading: false,
      };
    case TicketStatusActions.FETCH_STATUS_TRANSITIONS_LOADING:
      return {
        ...state,
        ticketStatusInfo: undefined,
        ticketStatusError: undefined,
        ticketStatusLoading: true,
      };
    default:
      return { ...state };
  }
};
