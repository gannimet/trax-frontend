import { Ticket, TicketStatus } from '../../../../models/ticket.models';

export interface TicketStatusItemProps {
  ticket: Ticket;
  statusOptions: TicketStatus[];
  onEditSubmit(value: string): void;
}
