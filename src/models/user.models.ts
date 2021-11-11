import { AuthIdentity } from './auth.models';
import { Team } from './team.models';

export interface User extends AuthIdentity {
  emailVerified: boolean;
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
