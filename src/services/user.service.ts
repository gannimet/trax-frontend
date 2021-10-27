import { UserTeamInfo } from '../models/user.models';
import HttpClientService from './http-client.service';

class UserService extends HttpClientService {
  getTeamsForUser(userId: string): Promise<UserTeamInfo[]> {
    return UserService.getClientInstance()
      .get<UserTeamInfo[]>(`/users/${userId}/teams`)
      .then((response) => response.data);
  }

  getTeamDetailsForUser(userId: string, teamId: string): Promise<UserTeamInfo> {
    return UserService.getClientInstance()
      .get<UserTeamInfo>(`/users/${userId}/teams/${teamId}`)
      .then((response) => response.data);
  }
}

export default UserService;
