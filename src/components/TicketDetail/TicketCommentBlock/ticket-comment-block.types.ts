import { TicketComment } from '../../../models/ticket.models';

export interface TicketCommentBlockProps {
  comments: TicketComment[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCommentSubmit: (formValue: { commentText: string }) => Promise<any>;
}
