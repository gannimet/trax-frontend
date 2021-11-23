import { Reducer } from 'redux';
import { TicketTypeObj } from '../../models/ticket.models';
import {
  TicketTypeActions,
  TicketTypesReducerAction,
} from '../actions/ticket-type.actions';

export interface TicketTypesState {
  ticketTypes?: TicketTypeObj[];
  ticketTypesError?: Error;
  ticketTypesLoading: boolean;
}

export const ticketTypesInitialState: TicketTypesState = {
  ticketTypesLoading: false,
};

export const ticketTypesReducer: Reducer<
  TicketTypesState,
  TicketTypesReducerAction
> = (state = ticketTypesInitialState, action) => {
  switch (action.type) {
    case TicketTypeActions.FETCH_TICKET_TYPES_SUCCESS:
      return {
        ...state,
        ticketTypes: action.ticketTypes,
        ticketTypesError: undefined,
        ticketTypesLoading: false,
      };
    case TicketTypeActions.FETCH_TICKET_TYPES_ERROR:
      return {
        ...state,
        ticketTypes: undefined,
        ticketTypesError: action.error,
        ticketTypesLoading: false,
      };
    case TicketTypeActions.FETCH_TICKET_TYPES_LOADING:
      return {
        ...state,
        ticketTypes: undefined,
        ticketTypesError: undefined,
        ticketTypesLoading: true,
      };
    default:
      return { ...state };
  }
};
