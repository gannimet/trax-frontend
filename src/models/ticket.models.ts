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
  comments: TicketComment[];
  edits: TicketEdit[];
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

export interface TicketComment {
  id: string;
  text: string;
  author: User;
  createdAt: string;
}

export type TicketEditField =
  | 'TITLE'
  | 'DESCRIPTION'
  | 'ASSIGNEE'
  | 'SPRINT'
  | 'STATUS'
  | 'TYPE';

export interface TicketEdit {
  id: string;
  editor: User;
  field: TicketEditField;
  editedAt: string;
}
