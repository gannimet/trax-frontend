import { TicketStatus } from '../models/ticket.models';
import { User, UserTeamInfo } from '../models/user.models';
import HttpClientService from './http-client.service';

class TeamService extends HttpClientService {
  getTeamsForUser(): Promise<UserTeamInfo[]> {
    return TeamService.getClientInstance()
      .get<UserTeamInfo[]>('/teams')
      .then((response) => response.data);
  }

  getTeamDetailsForUser(teamId: string): Promise<UserTeamInfo> {
    return TeamService.getClientInstance()
      .get<UserTeamInfo>(`/teams/${teamId}`)
      .then((response) => response.data);
  }

  getTicketStatusTransitionInfo(teamId: string): Promise<TicketStatus[]> {
    return TeamService.getClientInstance()
      .get<TicketStatus[]>(`/teams/${teamId}/statusinfo`)
      .then((response) => response.data);
  }

  getUsersOfTeam(teamId: string, search: string): Promise<User[]> {
    return TeamService.getClientInstance()
      .get<User[]>(`/teams/${teamId}/users?search=${search}`)
      .then((response) => response.data);
  }
}

export default TeamService;
