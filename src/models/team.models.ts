export interface UserTeamsInfo {
  canEditTickets: boolean;
  canDeleteTickets: boolean;
  canEditSprints: boolean;
  canDeleteSprints: boolean;
  team: Team;
}

export interface Team {
  id: string;
  name: string;
  description?: string;
  avatar?: null;
  initialTicketStatusId?: string;
}
