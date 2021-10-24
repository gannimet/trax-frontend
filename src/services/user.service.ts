import { UserTeamsInfo } from '../models/team.models';
import HttpClientService from './http-client.service';

class UserService extends HttpClientService {
  getTeamsForUser(userId: string): Promise<UserTeamsInfo[]> {
    return UserService.getClientInstance()
      .get<UserTeamsInfo[]>(`/users/${userId}/teams`)
      .then((response) => response.data);
  }
}

export default UserService;
