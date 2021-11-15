import { Ticket } from '../models/ticket.models';
import { TicketStatusInfoState } from '../state/reducers/ticket-status.reducer';
import { TicketsState } from '../state/reducers/tickets.reducer';
import { StateEqualityFn } from '../state/root.reducer';

export type IdentifiableObjectArray = { id: string }[];

export const ticketStatusInfoStateEqualityFn: StateEqualityFn<TicketStatusInfoState> =
  (prev, next): boolean => {
    if (prev.ticketStatusLoading !== next.ticketStatusLoading) {
      return false;
    }

    if (prev.ticketStatusError !== next.ticketStatusError) {
      return false;
    }

    if (!prev.ticketStatusInfo) {
      return !next.ticketStatusInfo;
    } else if (!next.ticketStatusInfo) {
      return false;
    }

    return checkIdObjectArrayEquality(
      prev.ticketStatusInfo,
      next.ticketStatusInfo,
    );
  };

export const ticketsStateEqualityFn: StateEqualityFn<TicketsState> = (
  prev,
  next,
) => {
  if (prev.ticketLoading !== next.ticketLoading) {
    return false;
  }

  if (prev.ticketError !== next.ticketError) {
    return false;
  }

  if (!prev.ticket) {
    return !next.ticket;
  } else if (!next.ticket) {
    return false;
  }

  return checkTicketEquality(prev.ticket, next.ticket);
};

const checkTicketEquality = (prev: Ticket, next: Ticket): boolean => {
  const primitivesAreEqual =
    prev.id === next.id &&
    prev.title === next.title &&
    prev.description === next.description &&
    prev.estimate === next.estimate &&
    prev.issueNumber === next.issueNumber;

  if (!primitivesAreEqual) {
    return false;
  }

  if (prev.assignee?.id !== next.assignee?.id) {
    return false;
  }

  if (prev.status?.id !== next.status?.id) {
    return false;
  }

  if (prev.type.id !== next.type.id) {
    return false;
  }

  if (prev.sprint?.id !== next.sprint?.id) {
    return false;
  }

  return (
    checkIdObjectArrayEquality(prev.tags, next.tags) &&
    checkIdObjectArrayEquality(prev.edits, next.edits) &&
    checkIdObjectArrayEquality(prev.comments, next.comments)
  );
};

const checkIdObjectArrayEquality = (
  prev: IdentifiableObjectArray,
  next: IdentifiableObjectArray,
): boolean => {
  return (
    prev.length === next.length &&
    prev
      .map((status) => status.id)
      .sort()
      .join() ===
      next
        .map((status) => status.id)
        .sort()
        .join()
  );
};
