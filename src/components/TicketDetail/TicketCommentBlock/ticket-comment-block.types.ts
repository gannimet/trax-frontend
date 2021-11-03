import { TicketComment } from '../../../models/ticket.models';

export interface TicketCommentBlockProps {
  comments: TicketComment[];
  onCommentSubmit: (formValue: { commentText: string }) => void;
}
