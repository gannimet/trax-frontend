import { User } from './user.models';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  issueNumber: number;
  authorId: string;
  assigneeId: string;
  statusId: string;
  sprintId: string;
  author: User;
  assignee?: User;
  status: TicketStatus;
  ticketType: TicketTypeObj;
  tags: TicketTag[];
  estimate?: number;
}

export interface TicketStatus {
  id: string;
  name: string;
  teamId: null;
}

export interface TicketTypeObj {
  id: string;
  name: TicketType;
}

export type TicketType = 'Task' | 'Subtask' | 'Story' | 'Bug';

export interface TicketTag {
  id: string;
  name: string;
  color: string;
}
