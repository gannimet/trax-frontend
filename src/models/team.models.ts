export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  avatar: null;
  roleId: string;
  role: Role;
  TeamUser?: UserTeamInfo;
  teams?: Team[];
}

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
  author?: User;
  assignee?: User;
  status: Status;
  ticketType: TicketTypeObj;
}

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
  initialTicketStatus: Status;
}

export interface UserTeamInfo {
  id: string;
  canEditTickets: boolean;
  canDeleteTickets: boolean;
  canEditSprints: boolean;
  canDeleteSprints: boolean;
  teamId: string;
  userId: string;
  team: Team;
  user: User;
}

export interface Status {
  id: string;
  name: string;
  teamId: null;
}

export interface Role {
  id: string;
  name: string;
  canEditTeams: boolean;
  canDeleteTeams: boolean;
}

export interface TicketTypeObj {
  id: string;
  name: TicketType;
}

export type TicketType = 'Task' | 'Subtask' | 'Story' | 'Bug';
