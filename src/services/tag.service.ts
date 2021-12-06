import { TicketTag } from '../models/ticket.models';
import HttpClientService from './http-client.service';

class TagService extends HttpClientService {
  getFilteredTags(searchValue: string): Promise<TicketTag[]> {
    return TagService.getClientInstance()
      .get<TicketTag[]>(`/tags?searchValue=${searchValue}`)
      .then((response) => response.data);
  }
}

export default TagService;
