import { Ticket } from '../../../../models/ticket.models';

export interface TicketAssigneeItemProps {
  ticket: Ticket;
  onEditSubmit(value: string | null): void;
}
