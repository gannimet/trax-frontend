import { Ticket, TicketStatus } from './ticket.models';
import { User } from './user.models';

export interface Sprint {
  id: string;
  name: string;
  description?: string;
  active: boolean;
  sortIndex: number;
  teamId: string;
  tickets: Ticket[];
}

export interface Team {
  id: string;
  name: string;
  description: string;
  avatar: null;
  initialTicketStatusId: string;
  users?: User[];
  sprints?: Sprint[];
  initialTicketStatus: TicketStatus;
}
