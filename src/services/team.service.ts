import { UserTeamInfo } from '../models/user.models';
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
}

export default TeamService;
