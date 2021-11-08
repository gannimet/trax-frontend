import { Ticket } from '../../../models/ticket.models';

export interface TicketDetailTitleProps {
  ticket: Ticket;
  onTitleEdit(newTitle: string): void;
  allowEdits: boolean;
}
