import { Ticket, TicketEditField } from '../../../models/ticket.models';
import { ValueType } from '../../InlineEdit/TextInlineEdit/text-inline-edit.types';

export interface TicketMetaBlockProps {
  ticket: Ticket;
  onEditSubmit(field: TicketEditField, value: ValueType): void;
  alloweEdits: boolean;
}
