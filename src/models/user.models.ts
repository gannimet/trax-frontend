import { Team } from './team.models';

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

export interface Role {
  id: string;
  name: string;
  canEditTeams: boolean;
  canDeleteTeams: boolean;
}
