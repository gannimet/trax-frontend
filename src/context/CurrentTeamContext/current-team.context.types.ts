import React from 'react';
import { Team } from '../../models/team.models';

export interface CurrentTeamContextValue {
  currentTeam?: Team;
  setCurrentTeam(team: Team): void;
  clearCurrentTeam(): void;
}

export interface CurrentTeamContextProviderProps {
  children: React.ReactNode;
}
