import { Dispatch } from 'redux';
import { TicketTypeObj } from '../../models/ticket.models';
import TicketService from '../../services/ticket.service';

export class TicketTypeActions {
  static readonly FETCH_TICKET_TYPES_SUCCESS =
    '[TicketType] Fetch Ticket Types Success';
  static readonly FETCH_TICKET_TYPES_LOADING =
    '[TicketType] Fetch Ticket Types Loading';
  static readonly FETCH_TICKET_TYPES_ERROR =
    '[TicketType] Fetch Ticket Types Error';

  service = new TicketService();

  fetchTicketTypes = () => {
    return (dispatch: Dispatch): Promise<TicketTypesReducerAction> => {
      dispatch({
        type: TicketTypeActions.FETCH_TICKET_TYPES_LOADING as typeof TicketTypeActions.FETCH_TICKET_TYPES_LOADING,
      });

      return this.service.getAllTicketTypes().then(
        (ticketTypes) => {
          return dispatch({
            type: TicketTypeActions.FETCH_TICKET_TYPES_SUCCESS as typeof TicketTypeActions.FETCH_TICKET_TYPES_SUCCESS,
            ticketTypes,
          });
        },
        (error) => {
          return dispatch({
            type: TicketTypeActions.FETCH_TICKET_TYPES_ERROR as typeof TicketTypeActions.FETCH_TICKET_TYPES_ERROR,
            error,
          });
        },
      );
    };
  };
}

export type TicketTypesReducerAction =
  | FetchTicketTypesSuccess
  | FetchTicketTypesError
  | FetchTicketTypesLoading;

export interface FetchTicketTypesSuccess {
  type: typeof TicketTypeActions.FETCH_TICKET_TYPES_SUCCESS;
  ticketTypes: TicketTypeObj[];
}

export interface FetchTicketTypesError {
  type: typeof TicketTypeActions.FETCH_TICKET_TYPES_ERROR;
  error: Error;
}

export interface FetchTicketTypesLoading {
  type: typeof TicketTypeActions.FETCH_TICKET_TYPES_LOADING;
}
