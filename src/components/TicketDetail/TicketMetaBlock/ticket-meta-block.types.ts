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
    value:
      | number
      | string
      | User
      | TicketStatus
      | TicketType
      | null
      | undefined,
  ): void;
  allowEdits: boolean;
}
