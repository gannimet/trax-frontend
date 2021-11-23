import { Ticket, TicketTypeObj } from '../../../../models/ticket.models';

export interface TicketTypeItemProps {
  ticket: Ticket;
  convertibleTypes: TicketTypeObj[];
  onEditSubmit(value: string): void;
}
