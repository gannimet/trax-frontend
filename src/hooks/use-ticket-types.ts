import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import {
  TicketTypeActions,
  TicketTypesReducerAction,
} from '../state/actions/ticket-type.actions';
import { TicketTypesState } from '../state/reducers/ticket-type.reducer';
import { StoreStateType } from '../state/root.reducer';
import { ticketTypesStateEqualityFn } from '../utils/state-utils';

export const useTicketTypes = (): TicketTypesState => {
  const state = useSelector<StoreStateType, TicketTypesState>(
    (state) => state.ticketTypes,
    ticketTypesStateEqualityFn,
  );
  const { ticketTypes } = state;

  const dispatch: ThunkDispatch<
    StoreStateType,
    void,
    TicketTypesReducerAction
  > = useDispatch<Dispatch<TicketTypesReducerAction>>();

  const { fetchTicketTypes } = new TicketTypeActions();

  if (!ticketTypes) {
    dispatch(fetchTicketTypes());
  }

  return state;
};
