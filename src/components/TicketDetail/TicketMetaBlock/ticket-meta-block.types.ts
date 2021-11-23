import {
  Ticket,
  TicketEditField,
  TicketStatus,
  TicketType,
  TicketTypeObj,
} from '../../../models/ticket.models';
import { User } from '../../../models/user.models';

export interface TicketMetaBlockProps {
  ticket: Ticket;
  statusInfo: TicketStatus[];
  convertibleTypes: TicketTypeObj[];
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
