import { Ticket, TicketEditField } from '../../../../models/ticket.models';

export interface TicketAssigneeItemProps {
  ticket: Ticket;
  onEditSubmit(field: TicketEditField, value: string | null): void;
}
