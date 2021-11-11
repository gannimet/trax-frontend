import {
  Ticket,
  TicketEditField,
  TicketStatus,
  TicketType,
} from '../../../models/ticket.models';
import { User } from '../../../models/user.models';

export interface TicketMetaBlockProps {
  ticket: Ticket;
  statusInfo: TicketStatus[];
  onEditSubmit(
    field: TicketEditField,
    value: number | User | TicketStatus | TicketType | null | undefined,
  ): void;
  alloweEdits: boolean;
}
